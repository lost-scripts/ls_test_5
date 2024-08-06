/* 
ScriptName = "index.js"
ScriptBirth = "20240506-0030"
ScriptBuild = "20240707-1450"
*/

if (!window.scriptLoaded) { 
    window.scriptLoaded = true;
    var currentScriptPath = document.currentScript.src;
    var isExpanded = false; 

    document.addEventListener('DOMContentLoaded', function() {
        if (window.self === window.top) { 
            var scriptPath = currentScriptPath;
            if (scriptPath) {
                var dirPath = scriptPath.slice(0, scriptPath.lastIndexOf('/') + 1); 
                var indexPath = dirPath + "index.html";
                var pagePath = window.location.href;
                var pagePathRel = getRelativePath(dirPath, pagePath);
                var newPath = indexPath + "#" + pagePathRel;
                window.location.href = newPath; 
            } else {
                console.error('No se pudo encontrar el tag de script para index.js');
            }
        } else {
            var basicStyles = document.getElementById('basic-styles');
            if (basicStyles) {
                basicStyles.parentNode.removeChild(basicStyles);
                console.log('Estilos básicos eliminados en el iFrame.');
            }
        }

        // Inicializaciones adicionales aquí
        updatePageContent();
    });

    function getRelativePath(source, target) {
        const fromParts = source.split('/');
        const toParts = target.split('/');
        fromParts.pop();
        let i = 0;
        while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
            i++;
        }
        const numUpDirs = fromParts.length - i;
        let relativePath = '';
        for (let j = 0; j < numUpDirs; j++) {
            relativePath += '../';
        }
        for (let k = i; k < toParts.length; k++) {
            relativePath += toParts[k];
            if (k < toParts.length - 1) {
                relativePath += '/';
            }
        }
        return relativePath;
    }

    async function loadLuaScript(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading Lua script:', error);
            return null;
        }
    }

    function cleanValue(value) {
        return value.replace(/^["{]+|["}]+$/g, '').trim();
    }

    async function extractLuaFunctions(url) {
        try {
            const luaScript = await loadLuaScript(url);
            if (!luaScript) return null;

            const lines = luaScript.split('\n');
            const extractedData = {};
            let insideLostScript = false;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                if (line.startsWith('function') && line.includes(':LostScript')) {
                    insideLostScript = true;
                    continue;
                }

                if (insideLostScript) {
                    if (line.startsWith('end')) {
                        insideLostScript = false;
                        break;
                    }

                    const keyValue = line.split('=');
                    if (keyValue.length === 2) {
                        const key = keyValue[0].trim();
                        const value = cleanValue(keyValue[1]);
                        extractedData[key] = value;
                    }
                }
            }

            return extractedData;
        } catch (error) {
            console.error('Error extracting Lua functions:', error);
            return null;
        }
    }

    async function displayExtractedFunctions(luaScriptUrl, field) {
        const extractedData = await extractLuaFunctions(luaScriptUrl);

        if (extractedData) {
            console.log('Extracted Lua functions:', extractedData);

            const fieldValue = extractedData[field];
            if (fieldValue) {
                return fieldValue;
            } else {
                return `Field "${field}" not found.`;
            }
        } else {
            return 'Failed to extract Lua functions.';
        }
    }

    async function updatePageContent() {
        const luaScriptUrl = 'ls_shapes_window.lua';

        const name = await displayExtractedFunctions(luaScriptUrl, "Name");
        const version = await displayExtractedFunctions(luaScriptUrl, "Version");
        const description = await displayExtractedFunctions(luaScriptUrl, "Description");

        document.getElementById('name-placeholder').textContent = name;
        document.getElementById('version-placeholder').textContent = version;
        document.getElementById('description-placeholder').textContent = description;
    }
}
