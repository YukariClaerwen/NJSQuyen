<?php
    <?php
    $url = 'http://localhost:7000/timkiem/hoa?';
     
    $lines_string = file_get_contents($url);
     
    echo htmlspecialchars($lines_string); // hiển thị dữ liệu
    ?>

?>