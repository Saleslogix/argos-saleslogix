#Scene, Layout and Panes

With larger and larger phone, popularity of tablets and increasing mobile version usage on the desktop Argos needed to address the ability to display 
multiple views at once. The resulting system is as follows:

{@img scene_layout_pane_flow.png Scene Layout Pane}

##Scene

Scene is at the top and controls the view instances - registering, showing, getting, customizing, all happens here. It has a child component - Layout. 

When a new view is to be shown Scene will do a bit of investigative work as to how to handle this views navigation and history. It has a lot of fancy 
jedi tricks to recreate the shortest history path to the view combination that is being shown.

After it takes care of that it determines what the view set should be - this includes looking at the view instances tier to determine where in the set the view 
should go. For example, if I have a two-column app (50/50) with the app showing A and B and a call to show C to replace B is called:

    // old view set
    [A, B] // [0] = tier 0, [1] = tier 1
    
    // new view set
    // what tier is view C? C.tier == 1
    [A, C]

Scene then passes this new view set to Layout to handle the rest.

##Layout

Layout is the organizer cog in this system, it is made up of Panes which define the "viewport". Meaning you can set up a 3-column wide app or 2-row app 
based on how you setup Layout.

It recieves the view set from Scene then does a bit of investigative work to see what sort of transitions should be applied.

Following the example above it would see that A did not change and should not recieve any transition effects. The B -> C change is found and it's Pane 
transition is set to `slide`.

With the transitions in place it then identifies which Pane the views should be placed into and calls the appropiate show method of each Pane.

##Pane

Panes are view containers and they make up the layout of the app. Panes are matched to views by the `tier` property. As mentioned under Scene, the 
view history is a set of views where the tier number is the index in the set. If a tier is not set (false) the Pane is untracked and must be explicity called when 
showing the view (see {@link _Scene#showView showView}, at param). 

When thinking of Pane layouts take into consideration that not all Panes need to be visible, tracked, full screen or any other limiting factor - they are open 
to any creative styling and setup. For example the {@link DialogPane DialogPane} is hidden by default and when shown it appears over the entire app with 
a masked translucent background.

Let the creativity flow! You do not need to be restricted to any design (mockups made with [balsamiq](http://www.balsamiq.com/):


###Complex Single Page

{@img complex_single_page.png Complex Single Page}

Example of using a single page with static left/right side bars and full bottom tab navigation. Only the center content is tracked in history, the static 
panes would be called directly with the appropriate views.


###Complex Multi Page

{@img complex_multi_page.png Complex Multi Page}

Example of using a List selection at the bottom with a large Detail - also utilizes a static graph and nav panes. The changes in the List and Detail panes 
would be tracked to history, the nav would be static and the info could change by list/detail views as needed.