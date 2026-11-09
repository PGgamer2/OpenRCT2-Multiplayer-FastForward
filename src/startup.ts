function changeSpeed(newSpeed: number, playerId: number, query: boolean): GameActionResult
{
	if (network.mode == "client")
		return { error: 0 };
	// Check permissions
	let canChangeSpeed = true;
	if (network.mode != "none") {
		let groupId = network.getPlayer(playerId).group;
		canChangeSpeed = network.getGroup(groupId).permissions.indexOf("toggle_pause") != -1;
	}
	if (canChangeSpeed && !query) {
		// Change game_speed
		context.executeAction("gamesetspeed", { speed: newSpeed }, (result) => {
			if (result.error || 0 != 0)
				console.log("Error " + result.error + ": " + result.errorMessage);
		});
	}
	return canChangeSpeed ? { error: 0 } : { error: 1, errorMessage: "Permission Denied" };
}

function sendChangeSpeed(amount: number = 1)
{
	context.executeAction("mpff-changespeed", { speed: Math.max((context.gameSpeed + amount) % 6, 1) }, (result) => {
		if (result.error || 0 != 0) {
			console.log("Error " + result.error + ": " + result.errorMessage);
			if (typeof ui !== "undefined") {
				ui.showError(result.errorTitle || ("Error " + result.error), result.errorMessage || "Unknown error");
			}
		}
	});
}

/* USER INTERFACE */

var ffIcon: number | undefined = undefined;
function drawFastForwardIcon()
{
	if (ffIcon === undefined) {
		ffIcon = ui.imageManager.allocate(1)!.start;
	}
	ui.imageManager.draw(ffIcon!, {width: 25, height: 25}, (g) => {
		g.clear();
		g.image(context.getIcon("fast_forward"), 3, 2);
		if (context.gameSpeed < 5) {
			for (let i = 0; i < context.gameSpeed; i++) {
				g.image(context.getIcon("game_speed_indicator"), 2 + i * 5, 14);
			}
		} else {
			for (let i = 0; i < 3; i++) {
				g.image(context.getIcon("game_speed_indicator_double"), 2 + i * 6, 14);
			}
		}
	});
}

function showFastForwardMenu()
{
	const winWidth = 100, winHeight = 50;
	drawFastForwardIcon(); // Draw icon in case it's never been drawn before

	const forwardBtn: ButtonDesc = {
		type: "button",
		width: 25,
		height: 25,
		x: winWidth / 2 - 25 / 2,
		y: (winHeight - 15) / 2 + 15 - 25 / 2,
		name: "ForwardBtn",
		border: true,
		image: ffIcon,
		onClick: sendChangeSpeed
	};

	ui.openWindow({
		classification: "mpff-menu",
		title: "Fast Forward",
		width: winWidth,
		height: winHeight,
		widgets: [ forwardBtn ]
	});
}

/* STARTUP */

export function startup()
{
	// Register custom action
	context.registerAction("mpff-changespeed",
		(event: GameActionEventArgs<{ speed: number }>) => changeSpeed(event.args.speed, event.player, true),
		(event: GameActionEventArgs<{ speed: number }>) => changeSpeed(event.args.speed, event.player, false));

	if (typeof ui !== "undefined") {
		context.subscribe("action.execute", (e: GameActionEventArgs) => {
			if (e.action === "gamesetspeed") {
				// Redraw the fast forward icon when the game speed changes
				drawFastForwardIcon();
			}
		});
		// Register a menu item under the map icon
		ui.registerMenuItem("Fast Forward", showFastForwardMenu);
	}
}