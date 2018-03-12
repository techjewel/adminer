<?php

class LoadDependencies
{
    public function head()
    {
        echo '<script' .nonce(). 'src="/js/jquery.min.js"></script>';

        echo '<script' .nonce(). 'src="/js/index.js"></script>';
    }
}
