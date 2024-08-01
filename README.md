<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lua VM Example</title>
    <script src="libs/lua.vm.js"></script>
    <script>
        // Crear la función MOHO.Localize() fake
        const MOHO = {
            Localize: function(str) {
                return str;
            }
        };

        // Cargar el script Lua desde GitHub Pages
        fetch('Menu/ls_shapes_window.lua')
            .then(response => response.text())
            .then(luaScript => {
                const L = lua.vm.create();
                L.execute(luaScript);

                // Llamar a las funciones Lua y mostrar los resultados
                const name = L.call('LS_ShapesWindow:Name');
                const version = L.call('LS_ShapesWindow:Version');
                const description = L.call('LS_ShapesWindow:Description');

                console.log('Name:', name);
                console.log('Version:', version);
                console.log('Description:', description);
            });
    </script>
</head>
<body>
    <h1>Lua VM Example</h1>
    <p>Abre la consola del navegador para ver los resultados.</p>
</body>
</html>
