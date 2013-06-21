#Upgrading Argos v2 to Argos v3

##Screen Layout
With the stronger focus on larger resolutions there became a need to present multiple views on screen at once. The v2 system was purely a single 
page app system and no amount of tweaking or improvements would bring it up to the new standard.

Out goes the ReUI framework and bring on the new system: [Scene, Layout and Panes](#!/guide/v3_scene_layout_pane).

Follow that guide for the conceptual description of the change and the opportunities it provides.

As a result of this move an App will now have the following files:


* `products\argos-app\src\Application' - Handler for autherization, security, user information.
* `products\argos-app\src\ApplicationLayout' - Sets up the Layout portion of the puzzle.
* `products\argos-app\src\ApplicationModule` - Loads any non-SDK fields and calls `loadCustomizations` for 3rd party alterations.
* `products\argos-app\src\ApplicationScene` - Defines the Scene part, typically this is merely the `ApplicationLayout` defined earlier.
* `products\argos-app\src\ApplicationViews` - This defines the view registration map, this is a quicker way to register view than the previous require, 
reference and register.



