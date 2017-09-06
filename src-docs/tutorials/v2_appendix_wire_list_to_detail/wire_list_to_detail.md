In order for Detail Views to work they need to be passed a `key` in the navigation options. This topic covers setting up an existing List View for the same entity as a Detail View so when a List row is clicked it will pass the `key` to the right Detail View.

First let's inspect how the List View shows the Detail View which will leads us to the first way of showing data in Detail -- passing a key.

1\. Fire up your app, and go to your List view. Inspect the rendered HTML of a row, it should look something like:

    <div data-action="activateEntry" data-key="AA2EK0013056" data-descriptor="Allied Corp.">
       <button data-action="selectEntry" class="list-item-selector button"><img src="content/images/icons/Company_24.png" class="icon"></button>
       <div class="list-item-content">
          <p class="listview-heading">Allied Corp.</p>
          <p class="micro-text">Lee Hogan</p>
       </div>
    </div>

2\. The important part here to note the `data-key` is the `$key` of the entry and if you look in `mobile/argos-sdk/src/List.js` and down to `navigateToDetailView`:

    navigateToDetailView: function(key, descriptor) {
        var view = App.getView(this.detailView);
        if (view)
            view.show({
                descriptor: descriptor,
                key: key
            });
    },

3\. In the navigation options it is passing the `key` and `descriptor`. Also the view it is going to is defined at List.detailView.

4\. Without going into too great of detail (pun not intended!) to quickly go over how the Detail view requests data when it is shown with a `key` is to take a look at `argos-sdk/src/Detail.js` and at the `refreshRequiredFor()` function.

5\. This function is called during transition if it returns true then the views `refresh()` function will be called, and the following part looks for a new key in navigation options:

     if (this.options.key !== options.key) return true;

6\. If you go down to the `refresh()` function it calls `requestData()` and that does the whole request, process, place cycle.
