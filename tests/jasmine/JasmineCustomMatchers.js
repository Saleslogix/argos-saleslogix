var JASMINE_SLX_MATCHERS = {
    toContainError: function(error) {
        if (!this.actual) return false;

        for (var i=0; i<this.actual.length; i++)
        {
            if (!error.name || !error.message) return false;
            if (this.actual[i].name === error.name && this.actual[i].message === error.message) return true;
        }

        return false;
    }
};
  