<?php
$img_array = glob("photos/*.{gif,jpg,png}", GLOB_BRACE);
$img = array_rand($img_array);
$dz = $img_array[$img];  // 修正这行的等号
header("Location: ".$dz);
?>