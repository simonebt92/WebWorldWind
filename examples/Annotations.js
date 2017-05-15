/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
requirejs(['../src/WorldWind',
        './LayerManager'],
    function (ww,
              LayerManager) {
        "use strict";

        // Tell World Wind to log only warnings.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the World Window.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        var annotationsLayer = new WorldWind.RenderableLayer("Annotations");

        var locations = [
            new WorldWind.Position(54.560028, -102.221517, 1e2),
            new WorldWind.Position(40.964231, -103.627767, 1e2),
            new WorldWind.Position(-20.27, -121.85, 1e2),
            new WorldWind.Position(24.27, -138.38, 1e2),
            new WorldWind.Position(-11.820326, -66.076097, 1e2),
            new WorldWind.Position(19.59, -99.38, 1e2)
        ];

        var annotations = [],
            annotation,
             annotationAttributes;

        var backgroundColors = [
            WorldWind.Color.BLUE,
            WorldWind.Color.DARK_GRAY,
            WorldWind.Color.MAGENTA,
            WorldWind.Color.CYAN,
            WorldWind.Color.BLACK,
            WorldWind.Color.RED];


        // Assign different annotation properties according to each location
        for (var annotationNumber = 0; annotationNumber < locations.length; annotationNumber++) {

            annotationAttributes = new WorldWind.AnnotationAttributes(null);

            switch(annotationNumber){

                case 0: // Blue annotation
                    annotationAttributes.backgroundColor = backgroundColors[annotationNumber];
                    annotationAttributes.drawLeader = true;
                    annotationAttributes.cornerRadius = 35;
                    annotationAttributes.leaderGapWidth = 40;
                    annotationAttributes.leaderGapHeight = 30;
                    annotationAttributes.opacity = 1;
                    annotationAttributes.scale = 1;
                    annotationAttributes.width = 200;
                    annotationAttributes.height = 100;
                    annotationAttributes.textAttributes.color = WorldWind.Color.WHITE;
                    annotationAttributes.insets = new WorldWind.Insets(20, 20, 20, 20);

                    annotation = new WorldWind.Annotation(locations[annotationNumber], annotationAttributes);

                    break;

                case 1: // Dark gray, short and wide annotation
                    annotationAttributes.backgroundColor = backgroundColors[annotationNumber];
                    annotationAttributes.drawLeader = true;
                    annotationAttributes.cornerRadius = 0;
                    annotationAttributes.leaderGapWidth = 50;
                    annotationAttributes.leaderGapHeight = 20;
                    annotationAttributes.opacity = 1;
                    annotationAttributes.scale = 1;
                    annotationAttributes.width = 500;
                    annotationAttributes.height = 100;
                    // The alpha value of the text is compounded with the annotation color. The annotation itself is totally opaque
                    annotationAttributes.textAttributes.color = new WorldWind.Color(0,1,0,0.3);
                    annotationAttributes.insets = new WorldWind.Insets(5, 5, 5, 5);

                    annotation = new WorldWind.Annotation(locations[annotationNumber], annotationAttributes);

                    break;

                case 2: // Magenta annotation
                    annotationAttributes.backgroundColor = backgroundColors[annotationNumber];
                    annotationAttributes.drawLeader = false;
                    annotationAttributes.cornerRadius = 20;
                    annotationAttributes.opacity = 1;
                    annotationAttributes.scale = 1;
                    annotationAttributes.width = 60;
                    annotationAttributes.height = 300;
                    annotationAttributes.textAttributes.color = WorldWind.Color.CYAN;
                    // These inset settings put the text in the lower right corner
                    annotationAttributes.insets = new WorldWind.Insets(50, 50, 5, 5);

                    annotation = new WorldWind.Annotation(locations[annotationNumber], annotationAttributes);

                    break;

                case 3: // Cyan annotation
                    annotationAttributes.backgroundColor = backgroundColors[annotationNumber];
                    annotationAttributes.drawLeader = true;
                    annotationAttributes.cornerRadius = 10;
                    annotationAttributes.leaderGapWidth = 10;
                    annotationAttributes.leaderGapHeight = 30;
                    annotationAttributes.opacity = 1;
                    annotationAttributes.scale = 1;
                    annotationAttributes.width = 200;
                    annotationAttributes.height = 100;
                    annotationAttributes.textAttributes.color = WorldWind.Color.MAGENTA;
                    // These inset settings put the text in the upper left corner
                    annotationAttributes.insets = new WorldWind.Insets(5, 5, 50, 50);

                    annotation = new WorldWind.Annotation(locations[annotationNumber], annotationAttributes);

                    break;

                case 4: // Black (transparent) annotation
                    annotationAttributes.backgroundColor = backgroundColors[annotationNumber];
                    annotationAttributes.drawLeader = true;
                    annotationAttributes.cornerRadius = 35;
                    annotationAttributes.leaderGapWidth = 30;
                    annotationAttributes.leaderGapHeight = 30;
                    // The annotation opacity value applies to both the annotation and its text
                    annotationAttributes.opacity = 0.5;
                    annotationAttributes.scale = 1.7;
                    annotationAttributes.width = 200;
                    annotationAttributes.height = 100;
                    annotationAttributes.textAttributes.color = WorldWind.Color.WHITE;
                    // Bigger lateral insets
                    annotationAttributes.insets = new WorldWind.Insets(10, 30, 10, 30);

                    annotation = new WorldWind.Annotation(locations[annotationNumber], annotationAttributes);

                    break;

                case 5: // Red annotation
                    annotationAttributes.backgroundColor = backgroundColors[annotationNumber];
                    annotationAttributes.drawLeader = true;
                    annotationAttributes.cornerRadius = 15;
                    // Even with the annotation scaled down, the leader size stays the same.
                    annotationAttributes.leaderGapWidth = 40;
                    annotationAttributes.leaderGapHeight = 30;
                    annotationAttributes.opacity = 1;
                    annotationAttributes.scale = 0.8;
                    annotationAttributes.width = 200;
                    annotationAttributes.height = 100;
                    annotationAttributes.textAttributes.color = WorldWind.Color.BLACK;
                    annotationAttributes.insets = new WorldWind.Insets(10, 10, 10, 10);

                    annotation = new WorldWind.Annotation(locations[annotationNumber], annotationAttributes);

                    break;
            }

            annotation.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            annotations.push(annotation);
            annotationsLayer.addRenderable(annotation);
        }

        // Add the annotations layer to the World Window's layer list.
        wwd.addLayer(annotationsLayer);

        // Create a layer manager for controlling layer visibility.
        var layerManger = new LayerManager(wwd);

    });