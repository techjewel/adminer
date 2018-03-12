<?php

class JqueryLoader
{
    public function head()
    {
        echo '<script' .nonce(). 'src="/js/jquery.min.js"></script>';
    }
}
