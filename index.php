<?php
function adminer_object()
{
    // required to run any plugin
    include_once "./plugins/plugin.php";

    // autoloader
    foreach (glob("plugins/*.php") as $filename) {
        include_once "./$filename";
    }

    $plugins = [
        new LoadDependencies, // Always load it first.
        new AdminerDatabaseHide([
            'information_schema',
            'mysql',
            'performance_schema',
            'sys'
        ]),
        new AdminerEditTextarea,
        new AdminerEnumOption,
        new AdminerEditForeign,
        new AdminerTablesFilter,
        new AdminerFloatThead,
        new AdminerMenuScroller,
        new AdminerJsonPreview,
        new AdminerCollations,
    ];

    class AdminerCustomized extends AdminerPlugin
    {

        function permanentLogin($create = false)
        {
            return "90b6de9470e50e76a8f81e78dd4707a7";
        }

        function credentials()
        {
            return ['localhost', 'root', 'root'];
        }

        function login($login, $password)
        {
            return ($login == 'root' && $password == 'root');
        }
    }

    return new AdminerCustomized($plugins);
}

// include original Adminer or Adminer Editor
include "./adminer.php";