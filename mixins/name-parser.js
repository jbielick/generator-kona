var _ = require('underscore');
var underscoreInflections = require('underscore.inflections');

function NameParser(target) {
  _.extend(target.prototype, {
    parseName: function(name) {
      this.name || (this.name = name);

      this._.mixin(underscoreInflections);

      this.name = this._.trim(this.name);
      if (this.name.toLowerCase() !== 'application') {
        this.name = this._.pluralize(this.name);
      }
      this.snaked = this._.underscore(this.name);
      this.slugged = this._.slugify(this.snaked);
      this.classified = this._.camelize(this.snaked);
      this.camelized = this._.camelize(this.snaked, false);
      this.singularCamel = this._.singularize(this.camelized);
    }
  })
}

module.exports = NameParser;