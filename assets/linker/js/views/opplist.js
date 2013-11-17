window.OppListView = Backbone.View.extend({

    //tagName: "table",

    //className: "table",

    initialize: function (options) {
        this.page = options.page;
        this.isLoading = false;
        this.user = options.user;
        this.oppsList = new UserOppCollection();
        this.oppsList.page = this.page;
        this.oppsList.userName = this.user.get('name');

        _.bindAll(this, 'checkScroll');
        // bind to window
        $(window).scroll(this.checkScroll);

        this.render();
      
    },

    events: {
      'scroll': 'checkScroll'
    },

    render: function () {

        $(this.el).html('<table class="table table-hover"><thead>');

        this.template = _.template(JST['assets/linker/templates/tpl-opp-list-header.html']());

        $('thead',this.el).append(this.template);

        $('table',this.el).append('</thead><tbody>');

        this.loadOpps();

        return this;
    },

    loadOpps: function () {

        this.loading = true;

        this.oppsList.fetch({
            success: function (opps) {


                for (var i = 0; i < opps.length; i++) {
                    $('tbody',this.el).append(new OppListItemView({model: opps.models[i]}).render().el);
                }

            }
        });
        

        //$(this.el).append('</tbody></table>');

        //$(this.el).append(new Paginator({model: this.model, page: this.page}).render().el);


    },

    checkScroll: function () {
      var triggerPoint = 50; // 100px from the bottom

      console.log('scoll');
        if( !this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight ) {

          
          this.oppsList.page += 1; // Load next page
          console.log("scrolling: " +this.oppsList.page);  
          this.loadOpps();
        }
    }
});

window.OppListItemView = Backbone.View.extend({

    tagName: "tr",

    className: "span3",

    events: {
               "click": "viewClicked"
           },

    initialize: function () {

        this.template = _.template(JST['assets/linker/templates/tpl-opp-list-item.html']({model: this.model.toJSON()}));
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template);
        return this;
    },

    viewClicked: function (event) {
       app.navigate('opps/' + this.model.id, true);
    }

});