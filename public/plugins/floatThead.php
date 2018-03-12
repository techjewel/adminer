<?php

class AdminerFloatThead
{
    public function head()
    {
        echo '<script'.nonce().'src="/js/jquery.floatThead.js"></script>';
        
        ?>

        <script <?php echo nonce(); ?> type="text/javascript">
        		$(document).ready(function () {
        			$table = $('#content table').first();

        			var $window = $(window);

        			function handleFloatHead() {
        				if ($window.scrollTop() > 240) {
        					$table.floatThead({ position: 'absolute' });
        				} else {
        					$table.floatThead('destroy');
        				}
        			}

        			handleFloatHead();

        			$window.scroll(function () {
        				handleFloatHead();
        			})
        		});
        </script>

        <style type="text/css">
    		.floatThead-container { 
    			/*overflow: visible !important;*/
    		}
    	</style>
        
        <?php
    }
}
