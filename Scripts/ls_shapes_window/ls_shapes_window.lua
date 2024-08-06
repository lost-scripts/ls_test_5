-- **************************************************
-- Provide Moho with the name of this script object
-- **************************************************

ScriptName = "LS_ShapesWindow"

-- **************************************************
-- General information about this script
-- **************************************************

LS_ShapesWindow = {}

--LS_ShapesWindow.BASE_STR = 2320

function LS_ShapesWindow:LostScript(i)
	return ({
	"LS_ShapesWindow",
	-- Official stuff ↴
	Name = "Shapes Window",
	Version = "0.3.0",
	Description = "A persistent shape palette plus helpers for better management of Moho® vectors in general and the AMAZING new \"Liquid Shapes\" in particular.",
	Creator = "Rai López",
	UILabel = "Shapes Window",
	ColorizeIcon = true,
	-- Own stuff ↴
	Ack = {"Wes", "Paul", "Sam"},
	App = "Moho Pro 14.2+",
	Birth = "20220918-0248",
	Build = "20240224-0117",
	Color = LS and LS.LC_ORANGE or "E0A000",
	Company = "Lost Scripts™",
	Holder = {4, 5, 1, 7}, --tbl ([0] = The default new layer to be added? And then the other possible layers...)
	HolderPlacing = 0, --int (-1 = root, 0/nil = free, 1 = group)
	HolderStack = 0, --int (-1 = bottom, 0/nil = free, 1 = top)
	Icon = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHtJREFUeNrMlFEOgCAMQ6nZ/a9c9QOjixCGa3A/BBLI2tcBkkVZWxGXuX2WHDQVAHhdow9fB45BugIb6SJY7DGotkwpOdzA8hQ9ujkBf50TSyF6S5pvyDoxZUZMlzFAMD3N5FnrglTB7Bz84jetfkJpEZUMkG2RnMEuwACNsiZHP5wgfQAAAABJRU5ErkJggg==",
	Icon2x = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALZJREFUeNrsl9sKwCAMQxfx/3+5u4AwfHA6bb2lsIcxmDu2SSZE5Ji53DF5EaB3+cSz0cSBPUcIwHPl3jfecSyvASRygBro7UJJcsOSbXMgdiNTTVzazOo8fyUIYKWBeDZD+mqeJ+41vt7vKoU2Xwc0d9scQOknri1A/JGGecAcIMBoLqSq2GDJpRrzpQtwhFYEqMmTYc4DfyE4QgTQzoGXP4Md6JTEwiDr1AHMAEAbJUBlnQIMALYxKYFZ3lW1AAAAAElFTkSuQmCC",
	License = "Copyright © 2022-2024, Rai López <rai.lopez@outlook.com>.",
	License2 = "All Rights Reserved. This file is part of Lost Scripts™ project (the \"Software\"). Personal use and modification or derivative works allowed; redistribution/sale of the Software prohibited without explicit permission. See LICENSE for details.",
	Location = "Scripts/Menu/- Lost Scripts",
	Multi = true,
	Path = "",
	Priority = 1,
	Symbol = "🎶",
	Tags = "Multi, Multilayer, Multipurpose, Window, Shapes, Tests, WIP",
	Type = LS and LS.ST_MENU or 2,
	URL = "https://github.com/lost-scripts/ls_shapes_window",
	UUID = "9359801d-4575-89f1-1430-a735961168f4",
	Other = {"One", "Two", "Three", "Four"},
	})[i or 1]
end

print(LS_ShapesWindow:LostScript())
--print(LS_ShapesWindow:Name())
--print(LS_ShapesWindow:LostScript("Other"))
--print(LS_ShapesWindow:LostScript("Other")[2])

function LS_ShapesWindow:Name()
	return self:LostScript(debug.getinfo(1, "n").name)
end

function LS_ShapesWindow:Version()
	return self:LostScript(debug.getinfo(1, "n").name) -- "0.0.1.20231005.1731"
end

function LS_ShapesWindow:Description()
	return MOHO.Localize("/LS/ShapesWindow/Description=" .. self:LostScript(debug.getinfo(1, "n").name))
end

function LS_ShapesWindow:Creator()
	return self:LostScript(debug.getinfo(1, "n").name)
end

function LS_ShapesWindow:UILabel() -- Note: Runs upon window opening
	return MOHO.Localize("/LS/ShapesWindow/ShapesWindow=" .. self:LostScript(debug.getinfo(1, "n").name))
end

function LS_ShapesWindow:ColorizeIcon()
	return self:LostScript(debug.getinfo(1, "n").name)
end

-- **************************************************
-- Recurring values
-- **************************************************

LS_ShapesWindow.name = ScriptName
LS_ShapesWindow.birth = ScriptBirth
LS_ShapesWindow.build = ScriptBuild
