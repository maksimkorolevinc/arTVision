<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "Strannogedon@yandex.ru";  // Замени на свою почту
    $subject = "Новый вопрос от $name";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

    $body = "Имя: $name\nПочта: $email\n\nСообщение:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Ваше сообщение отправлено!'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Ошибка отправки, попробуйте снова!'); window.location.href='index.html';</script>";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
