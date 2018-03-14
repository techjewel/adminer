<?php

class FixedFooter
{
    public function head()
    {
        ?>
        <script <?php echo nonce(); ?> type="text/javascript">
            $(document).ready(function () {
                var $footer = $('.footer');

                if ($footer.length) {
                    var tableEndPos = $footer.offset().top;
                
                    $footer.css({ position: 'fixed'});
                
                    if ($(window).height() > tableEndPos) {
                        $footer.css({ top: tableEndPos + 'px' });
                    }

                    // append the import section to the footer
                    $footer.append($('.footer').next().addClass('footer-import'));
                }
            });
        </script>
        <?php
    }
}
