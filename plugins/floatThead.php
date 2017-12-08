<?php

class AdminerFloatThead
{
    public function head()
    {
        echo '<script src="/js/jquery.floatThead.min.js"></script>';
        echo '<script>$(document).ready(function() { $(\'#content table\').first().floatThead(); });</script>';
        echo '<style type="text/css">.floatThead-container { overflow: visible !important; }</style>';
    }
}
