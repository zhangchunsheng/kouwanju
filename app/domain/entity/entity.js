/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-27
 * Description: entity
 */
/**
 * Module dependencies
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var id = 1;

/**
 * Initialize a new 'Entity' with the given 'opts'.
 * Entity inherits EventEmitter
 *
 * @param {Object} opts
 * @api public
 */

var Entity = function(opts) {
    EventEmitter.call(this);
    this.entityId = id++;
    this.kindId = Number(opts.kindId);
    this.kindName = opts.kindName;
    this.englishName = opts.englishName;
    this.type = opts.type;
    this.x = opts.x || 100;
    this.y = opts.y || 100;

    this.areaId = opts.areaId || "city01";

    this.currentScene = opts.currentScene;

};

util.inherits(Entity, EventEmitter);

/**
 * Expose 'Entity' constructor
 */

module.exports = Entity;

/**
 * Get entityId
 *
 * @return {Number}
 * @api public
 */

Entity.prototype.getEntityId = function() {
    return this.entityId;
};

/**
 * Get state
 *
 * @return {Object}
 * @api public
 */

Entity.prototype.getState = function() {
    return {x: this.x, y: this.y};
};

/**
 * Set positon of this entityId
 *
 * @param {Number} x
 * @param {Number} y
 * @api public
 */

Entity.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};