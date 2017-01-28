<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>Бруто и нето плата во Македонија</title>

        <!-- Bootstrap -->
        <link href="bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="noUiSlider.9.0.0/nouislider.min.css" rel="stylesheet">
        <link href="style.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
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
            <div class="row">
                <div class="col-xs-12">
                    <h1>Бруто плата: <span id="bp"></span></h1>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div id="slider"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div id="box">
                        <p><b>Нето плата:</b> <span id="np"></span></p>
                        <p>Придонес за пензискo осигурување (18%): <span id="ppen"></span></p>
                        <p>Придонес за здравствено осигурување (7,3%): <span id="pzdr"></span></p>
                        <p>Придонес за вработување (1,2%): <span id="pvra"></span></p>
                        <p>Придонес за професионално заболување (0,5%): <span id="pzab"></span></p>
                        <p>Вкупно придонеси (<span id="procent_pridonesi"></span>%): <span id="prid"></span></p>
                        <p>Персонален данок (10%): <span id="pers"></span></p>
                        <p>Вкупен процент давачки: <span id="vkupen_procent"></span>%</p>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-xs-12">
                    <a href="http://plata.ui.mk/">http://plata.ui.mk/</a>
                    <br/>
                    <a href="https://github.com/goranmitev/netoplata">Netoplata on github.com</a>
                </div>
            </div>
        </div>

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
        <script src="noUiSlider.9.0.0/nouislider.min.js"></script>
        <script src="wnumb-1.0.2/wNumb.js"></script>
        <script src="script.js"></script>
        
    </body>
</html>