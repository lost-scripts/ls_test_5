document.addEventListener('DOMContentLoaded', function() {
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
        console.log('Original value:', value);
        let cleanedValue = value
            .replace(/^["{]+|["},]+$/g, '') // Elimina comillas y llaves al principio y al final
            .replace(/\\\"/g, '"')         // Reemplaza \" por "
            .replace(/["]+/g, '')          // Elimina todas las comillas internas
            .trim();                       // Elimina espacios en blanco al principio y al final
        console.log('Cleaned value:', cleanedValue);
        return cleanedValue;
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
                        const value = cleanValue(keyValue[1].trim());
                        extractedData[key] = value;
                    }
                }
            }

            console.log('Extracted Data:', extractedData);
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

    updatePageContent();
});
