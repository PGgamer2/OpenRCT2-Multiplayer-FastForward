import { startup } from "./startup";

registerPlugin({
	name: "Multiplayer Fast Forward",
	version: "1.0",
	authors: [ "SonoPG" ],
	type: "remote",
	licence: "MIT",
	/**
	 * This field determines which OpenRCT2 API version to use. It's best to always use the
	 * latest release version, unless you want to use specific versions from a newer develop
	 * version. Version 124 equals the v0.5.7 release.
	 * @see https://github.com/OpenRCT2/OpenRCT2/blob/v0.5.7/src/openrct2/scripting/ScriptEngine.h#L46
	 */
	targetApiVersion: 124,
	main: startup,
});