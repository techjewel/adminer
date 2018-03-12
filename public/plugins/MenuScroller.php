<?php

class AdminerMenuScroller
{
    public function head()
    {
        echo '<script'.nonce().'src="/js/menuScroller.js"></script>';
    }
}