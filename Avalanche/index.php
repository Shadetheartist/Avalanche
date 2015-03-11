<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Ablockalypse</title>

    <style>
        body {
            background-image: url(images/htmlbg.jpg);
            background-color: #890202;
            animation: fadeIn 2s;
            -webkit-animation: fadeIn 5s;
            margin: 0;
            padding: 0;
            font-weight: 100;
			font-family: sans-serif;
        }
        canvas {
            position: relative;
            display: block;
            margin: 10px auto;
            padding: 0;
            border: 2px solid black;
            z-index: 1;
        }
		.highscore_table{
			background-color: black;
			padding: 6px;
			color: white;
			border: 2px solid white;
		}
		.highscore_table td{
			padding: 3px;
			border-bottom: 1px solid grey;
		}
		.highscore_table_container{
			float: left;
			color: white;
			margin: 0;
		}
		.highscore_table_container h3{
			margin: 0;
		}
		
        .submit_score {
            display:inline-block;
            position: absolute;
            top: -250px;
            transition: top 1.5s;
            width: 200px;
            height: 200px;
            left: calc(50% - 100px);
            background-color: #000;
			border: 2px solid black;
            padding: 10px 5px;
            z-index: 2;
		}
        .submit_score h3{
			color: white;
            text-align: center;
		}
		#form_name_input{
			border: 0;
			padding: 5px;
		}
		#form_name_input:active, #form_name_input:focus{
			outline: 0;
		}
		.form_button{
			border: 0;
			
		}
        .submit_score input{
            display: block;
            margin: 1px auto;
			width: 100%;
		}
        .shown{
            top: 150px;
        }
        .wrapper{
            position: relative;
            margin: 0 auto;
            width: 925px;
        }
		
		.howtoplay{
			color: white;
			float: left;
			margin: 5px;
		}
		.howtoplay h3{
			margin: 1px;
		}
		.howtoplay p{
			margin: 1px;
			padding-left: 10px;
		}
		a:link {
			color: white;
		}
		a:visited {
			color: lightblue;
		}
    </style>
    <script src="js/controls.js"></script>
    <script src="js/utility.js"></script>
    <script src="js/player.js"></script>
    <script src="js/box.js"></script>
    <script src="js/minimap.js"></script>
    <script src="js/graphics.js"></script>
    <script src="js/particle.js"></script>
    <script src="js/score.js"></script>
    <script src="js/events.js"></script>
    <script src="js/menu.js"></script>
    <script src="js/main.js"></script>
</head>

<body onkeydown="Down(event)" onkeyup="Up(event)">
    <div class="wrapper">
    <canvas id="gameCanvas" width="925" height="600"></canvas>
    <div id="scoreform" class="submit_score">
        <h3>Submit Score</h3>
        <form  action="submitscore.php" method="post">
            <input id="form_name_input" type='text' placeholder="Your Name Here" name="name" maxlength=32/>
            <input id="form_score" type='hidden' name="score" value="0"/>
            <input id="form_height" type='hidden' name="height" value="0"/>
            <input id="form_highest_height" type='hidden' name="highest_height" value="0"/>
            <input class="form_button" type='submit' onsubmit="return onsubmitform();" />
            <input class="form_button" type='button' value="Cancel" onclick="return oncancelform();" />
        </form>
    </div>
    <div>
        <?php
            include('avalanche_table.php');
        ?>
    </div>
	 <div class="howtoplay">
        <h3>How To Play</h3>
        <p>'W' or Up to jump</p>
        <p>'A'-'D' or Left-Right to Move</p>
        <p>'S' or Down to look down</p>
        <p>Hold Shift to open minimap</p>
        <p>Enter or ESC to restart</p>
    </div>
	 <div class="howtoplay">
        <h3>Tips</h3>
        <p>Jump off of moving blocks for score</p>
        <p>If you jump from one falling block to another, your combo will increase</p>
        <p>If you land on a static block, your combo will be reset</p>
        <p>Avoid jumping into the bottom of blocks as you will lose score and speed</p>
    </div>
	<div class="howtoplay">
        <h3>Discalimer</h3>
        <p>I am not affiliated with Beast Games LLC.</p>
        <p>I did not contribute to either <a href="http://www.avalanchegame.org/">Avalanche</a> nor <a href="http://www.superavalanche.com/">Super Avalanche</a>.</p>
        <p>Please support the official release.</p>
    </div>
    </div>
    <script>
        window.onload = function(){
            init();
            _highestHeight = <?php echo (isset($_GET["highest_height"])? $_GET["highest_height"] : 600)?>
        }
    </script>

    
</body>

</html>










