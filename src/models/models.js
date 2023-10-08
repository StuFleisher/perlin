const INITIAL_SETTINGS = {
  width: 960,
  height: 540,
  margin: 100,

  animationSpeed: 0,
  evolution: 0,
  evolutionStep: .5,

  vertexCount: 20,
  yScale: 1,

  octaves: 0,
  subScaling: .5,
  subInfluence: .5,
  subOffset: 0,
};

class PerlinSettings {

  _settingsKeys = [
    "width",
    "height",
    "margin",
    "animationSpeed",
    "evolution",
    "evolutionStep",
    "vertexCount",
    "yScale",
    "octaves",
    "subScaling",
    "subInfluence",
    "subOffset",
  ];

  constructor(settings = INITIAL_SETTINGS) {
    for (const name of this._settingsKeys) {
      this[name] = settings[name] || INITIAL_SETTINGS[name];
    }
  }

  get settings() {
    const settings = {};
    for (const name of this._settingsKeys) {
      settings[name] = this[name];
    }
    return settings;
  }

  get midpoint() {
    return this.height / 2;
  }

  get minY() {
    return this.midpoint - this.yScale * (this.midpoint - this.margin);
  }

  get maxY() {
    return this.midpoint + this.yScale * (this.midpoint - this.margin);
  }

  get spacing() {
    //first and last vertexes are guides that don't render a path
    return this.width / (this.vertexCount - 2);
  }

  update(data) {
    for (const key in data) {
      if (key in this) {
        this[key] = data[key];
      }
    }
    return this;
  }

  duplicate() {
    return new PerlinSettings(this.settings);
  }

}

export default PerlinSettings;