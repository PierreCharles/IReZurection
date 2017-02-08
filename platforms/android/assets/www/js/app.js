/*
 File : app.js
 This is the start point of the application.
 Here defined configs of application
 */

angular.module('App', ['ionic'])

    .run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {


             if (window.matchMedia("(orientation: portrait)").matches) {
                alert("Mode paysage");
             }

             if (window.matchMedia("(orientation: landscape)").matches) {
                 var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);
             }

            /**
             * Method to resize gmain screen
             */
            var onResize = function () {
                var height = window.innerHeight;
                var width = window.innerWidth;
                game.width = width;
                game.height = height;

                if (game.renderType === Phaser.WEBGL) {
                    game.renderer.resize(width, height);
                }
            }

            onResize();
            window.addEventListener("resize", onResize, false);
            window.addEventListener("fullscreenchange", onResize, false);

            game.state.add('main_screen', MainScreen);
            game.state.start('main_screen');


        });
    })
