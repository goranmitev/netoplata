<!DOCTYPE html>
<html lang="mk">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Бруто и нето плата во Македонија</title>
        <link href="style.css" rel="stylesheet">
        <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-4327579-20', 'auto');
  ga('send', 'pageview');

</script>
    </head>
    <body>
        <div class="container">
            <h1>Бруто плата: <span id="bp"></span></h1>

            <input type="range" id="slider" min="38600" max="3000000" step="1000" value="40000">

            <div id="box">
                <p><b>Нето плата:</b> <span id="np"></span></p>
                <p>Придонес за пензискo осигурување (18,8%): <span id="ppen"></span></p>
                <p>Придонес за здравствено осигурување (7,5%): <span id="pzdr"></span></p>
                <p>Придонес за вработување (1,2%): <span id="pvra"></span></p>
                <p>Придонес за професионално заболување (0,5%): <span id="pzab"></span></p>
                <p>Вкупно придонеси (<span id="procent_pridonesi"></span>%): <span id="prid"></span></p>
                <p>Персонален данок (10%): <span id="pers"></span></p>
                <p>Вкупен процент давачки: <span id="vkupen_procent"></span>%</p>
            </div>

            <div id="links">
                <a href="http://plata.ui.mk/">http://plata.ui.mk/</a>
                <br>
                <a href="https://github.com/goranmitev/netoplata">Netoplata on github.com</a>
            </div>
        </div>

        <script src="script.js"></script>
    </body>
</html>
