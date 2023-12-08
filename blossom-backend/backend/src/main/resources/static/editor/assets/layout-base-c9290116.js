import { c as commonjsGlobal } from "./@braintree-12043bbe.js";
var layoutBase = { exports: {} };
var hasRequiredLayoutBase;
function requireLayoutBase() {
  if (hasRequiredLayoutBase)
    return layoutBase.exports;
  hasRequiredLayoutBase = 1;
  (function(module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
      module.exports = factory();
    })(commonjsGlobal, function() {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.i = function(value) {
            return value;
          };
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter
                /******/
              });
            }
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 26);
        }([
          /* 0 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function LayoutConstants() {
            }
            LayoutConstants.QUALITY = 1;
            LayoutConstants.DEFAULT_CREATE_BENDS_AS_NEEDED = false;
            LayoutConstants.DEFAULT_INCREMENTAL = false;
            LayoutConstants.DEFAULT_ANIMATION_ON_LAYOUT = true;
            LayoutConstants.DEFAULT_ANIMATION_DURING_LAYOUT = false;
            LayoutConstants.DEFAULT_ANIMATION_PERIOD = 50;
            LayoutConstants.DEFAULT_UNIFORM_LEAF_NODE_SIZES = false;
            LayoutConstants.DEFAULT_GRAPH_MARGIN = 15;
            LayoutConstants.NODE_DIMENSIONS_INCLUDE_LABELS = false;
            LayoutConstants.SIMPLE_NODE_SIZE = 40;
            LayoutConstants.SIMPLE_NODE_HALF_SIZE = LayoutConstants.SIMPLE_NODE_SIZE / 2;
            LayoutConstants.EMPTY_COMPOUND_NODE_SIZE = 40;
            LayoutConstants.MIN_EDGE_LENGTH = 1;
            LayoutConstants.WORLD_BOUNDARY = 1e6;
            LayoutConstants.INITIAL_WORLD_BOUNDARY = LayoutConstants.WORLD_BOUNDARY / 1e3;
            LayoutConstants.WORLD_CENTER_X = 1200;
            LayoutConstants.WORLD_CENTER_Y = 900;
            module2.exports = LayoutConstants;
          },
          /* 1 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var LGraphObject = __webpack_require__(2);
            var IGeometry = __webpack_require__(8);
            var IMath = __webpack_require__(9);
            function LEdge(source, target, vEdge) {
              LGraphObject.call(this, vEdge);
              this.isOverlapingSourceAndTarget = false;
              this.vGraphObject = vEdge;
              this.bendpoints = [];
              this.source = source;
              this.target = target;
            }
            LEdge.prototype = Object.create(LGraphObject.prototype);
            for (var prop in LGraphObject) {
              LEdge[prop] = LGraphObject[prop];
            }
            LEdge.prototype.getSource = function() {
              return this.source;
            };
            LEdge.prototype.getTarget = function() {
              return this.target;
            };
            LEdge.prototype.isInterGraph = function() {
              return this.isInterGraph;
            };
            LEdge.prototype.getLength = function() {
              return this.length;
            };
            LEdge.prototype.isOverlapingSourceAndTarget = function() {
              return this.isOverlapingSourceAndTarget;
            };
            LEdge.prototype.getBendpoints = function() {
              return this.bendpoints;
            };
            LEdge.prototype.getLca = function() {
              return this.lca;
            };
            LEdge.prototype.getSourceInLca = function() {
              return this.sourceInLca;
            };
            LEdge.prototype.getTargetInLca = function() {
              return this.targetInLca;
            };
            LEdge.prototype.getOtherEnd = function(node) {
              if (this.source === node) {
                return this.target;
              } else if (this.target === node) {
                return this.source;
              } else {
                throw "Node is not incident with this edge";
              }
            };
            LEdge.prototype.getOtherEndInGraph = function(node, graph) {
              var otherEnd = this.getOtherEnd(node);
              var root = graph.getGraphManager().getRoot();
              while (true) {
                if (otherEnd.getOwner() == graph) {
                  return otherEnd;
                }
                if (otherEnd.getOwner() == root) {
                  break;
                }
                otherEnd = otherEnd.getOwner().getParent();
              }
              return null;
            };
            LEdge.prototype.updateLength = function() {
              var clipPointCoordinates = new Array(4);
              this.isOverlapingSourceAndTarget = IGeometry.getIntersection(this.target.getRect(), this.source.getRect(), clipPointCoordinates);
              if (!this.isOverlapingSourceAndTarget) {
                this.lengthX = clipPointCoordinates[0] - clipPointCoordinates[2];
                this.lengthY = clipPointCoordinates[1] - clipPointCoordinates[3];
                if (Math.abs(this.lengthX) < 1) {
                  this.lengthX = IMath.sign(this.lengthX);
                }
                if (Math.abs(this.lengthY) < 1) {
                  this.lengthY = IMath.sign(this.lengthY);
                }
                this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
              }
            };
            LEdge.prototype.updateLengthSimple = function() {
              this.lengthX = this.target.getCenterX() - this.source.getCenterX();
              this.lengthY = this.target.getCenterY() - this.source.getCenterY();
              if (Math.abs(this.lengthX) < 1) {
                this.lengthX = IMath.sign(this.lengthX);
              }
              if (Math.abs(this.lengthY) < 1) {
                this.lengthY = IMath.sign(this.lengthY);
              }
              this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
            };
            module2.exports = LEdge;
          },
          /* 2 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function LGraphObject(vGraphObject) {
              this.vGraphObject = vGraphObject;
            }
            module2.exports = LGraphObject;
          },
          /* 3 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var LGraphObject = __webpack_require__(2);
            var Integer = __webpack_require__(10);
            var RectangleD = __webpack_require__(13);
            var LayoutConstants = __webpack_require__(0);
            var RandomSeed = __webpack_require__(16);
            var PointD = __webpack_require__(4);
            function LNode(gm, loc, size, vNode) {
              if (size == null && vNode == null) {
                vNode = loc;
              }
              LGraphObject.call(this, vNode);
              if (gm.graphManager != null)
                gm = gm.graphManager;
              this.estimatedSize = Integer.MIN_VALUE;
              this.inclusionTreeDepth = Integer.MAX_VALUE;
              this.vGraphObject = vNode;
              this.edges = [];
              this.graphManager = gm;
              if (size != null && loc != null)
                this.rect = new RectangleD(loc.x, loc.y, size.width, size.height);
              else
                this.rect = new RectangleD();
            }
            LNode.prototype = Object.create(LGraphObject.prototype);
            for (var prop in LGraphObject) {
              LNode[prop] = LGraphObject[prop];
            }
            LNode.prototype.getEdges = function() {
              return this.edges;
            };
            LNode.prototype.getChild = function() {
              return this.child;
            };
            LNode.prototype.getOwner = function() {
              return this.owner;
            };
            LNode.prototype.getWidth = function() {
              return this.rect.width;
            };
            LNode.prototype.setWidth = function(width) {
              this.rect.width = width;
            };
            LNode.prototype.getHeight = function() {
              return this.rect.height;
            };
            LNode.prototype.setHeight = function(height) {
              this.rect.height = height;
            };
            LNode.prototype.getCenterX = function() {
              return this.rect.x + this.rect.width / 2;
            };
            LNode.prototype.getCenterY = function() {
              return this.rect.y + this.rect.height / 2;
            };
            LNode.prototype.getCenter = function() {
              return new PointD(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
            };
            LNode.prototype.getLocation = function() {
              return new PointD(this.rect.x, this.rect.y);
            };
            LNode.prototype.getRect = function() {
              return this.rect;
            };
            LNode.prototype.getDiagonal = function() {
              return Math.sqrt(this.rect.width * this.rect.width + this.rect.height * this.rect.height);
            };
            LNode.prototype.getHalfTheDiagonal = function() {
              return Math.sqrt(this.rect.height * this.rect.height + this.rect.width * this.rect.width) / 2;
            };
            LNode.prototype.setRect = function(upperLeft, dimension) {
              this.rect.x = upperLeft.x;
              this.rect.y = upperLeft.y;
              this.rect.width = dimension.width;
              this.rect.height = dimension.height;
            };
            LNode.prototype.setCenter = function(cx, cy) {
              this.rect.x = cx - this.rect.width / 2;
              this.rect.y = cy - this.rect.height / 2;
            };
            LNode.prototype.setLocation = function(x, y) {
              this.rect.x = x;
              this.rect.y = y;
            };
            LNode.prototype.moveBy = function(dx, dy) {
              this.rect.x += dx;
              this.rect.y += dy;
            };
            LNode.prototype.getEdgeListToNode = function(to) {
              var edgeList = [];
              var self = this;
              self.edges.forEach(function(edge) {
                if (edge.target == to) {
                  if (edge.source != self)
                    throw "Incorrect edge source!";
                  edgeList.push(edge);
                }
              });
              return edgeList;
            };
            LNode.prototype.getEdgesBetween = function(other) {
              var edgeList = [];
              var self = this;
              self.edges.forEach(function(edge) {
                if (!(edge.source == self || edge.target == self))
                  throw "Incorrect edge source and/or target";
                if (edge.target == other || edge.source == other) {
                  edgeList.push(edge);
                }
              });
              return edgeList;
            };
            LNode.prototype.getNeighborsList = function() {
              var neighbors = /* @__PURE__ */ new Set();
              var self = this;
              self.edges.forEach(function(edge) {
                if (edge.source == self) {
                  neighbors.add(edge.target);
                } else {
                  if (edge.target != self) {
                    throw "Incorrect incidency!";
                  }
                  neighbors.add(edge.source);
                }
              });
              return neighbors;
            };
            LNode.prototype.withChildren = function() {
              var withNeighborsList = /* @__PURE__ */ new Set();
              var childNode;
              var children;
              withNeighborsList.add(this);
              if (this.child != null) {
                var nodes = this.child.getNodes();
                for (var i = 0; i < nodes.length; i++) {
                  childNode = nodes[i];
                  children = childNode.withChildren();
                  children.forEach(function(node) {
                    withNeighborsList.add(node);
                  });
                }
              }
              return withNeighborsList;
            };
            LNode.prototype.getNoOfChildren = function() {
              var noOfChildren = 0;
              var childNode;
              if (this.child == null) {
                noOfChildren = 1;
              } else {
                var nodes = this.child.getNodes();
                for (var i = 0; i < nodes.length; i++) {
                  childNode = nodes[i];
                  noOfChildren += childNode.getNoOfChildren();
                }
              }
              if (noOfChildren == 0) {
                noOfChildren = 1;
              }
              return noOfChildren;
            };
            LNode.prototype.getEstimatedSize = function() {
              if (this.estimatedSize == Integer.MIN_VALUE) {
                throw "assert failed";
              }
              return this.estimatedSize;
            };
            LNode.prototype.calcEstimatedSize = function() {
              if (this.child == null) {
                return this.estimatedSize = (this.rect.width + this.rect.height) / 2;
              } else {
                this.estimatedSize = this.child.calcEstimatedSize();
                this.rect.width = this.estimatedSize;
                this.rect.height = this.estimatedSize;
                return this.estimatedSize;
              }
            };
            LNode.prototype.scatter = function() {
              var randomCenterX;
              var randomCenterY;
              var minX = -LayoutConstants.INITIAL_WORLD_BOUNDARY;
              var maxX = LayoutConstants.INITIAL_WORLD_BOUNDARY;
              randomCenterX = LayoutConstants.WORLD_CENTER_X + RandomSeed.nextDouble() * (maxX - minX) + minX;
              var minY = -LayoutConstants.INITIAL_WORLD_BOUNDARY;
              var maxY = LayoutConstants.INITIAL_WORLD_BOUNDARY;
              randomCenterY = LayoutConstants.WORLD_CENTER_Y + RandomSeed.nextDouble() * (maxY - minY) + minY;
              this.rect.x = randomCenterX;
              this.rect.y = randomCenterY;
            };
            LNode.prototype.updateBounds = function() {
              if (this.getChild() == null) {
                throw "assert failed";
              }
              if (this.getChild().getNodes().length != 0) {
                var childGraph = this.getChild();
                childGraph.updateBounds(true);
                this.rect.x = childGraph.getLeft();
                this.rect.y = childGraph.getTop();
                this.setWidth(childGraph.getRight() - childGraph.getLeft());
                this.setHeight(childGraph.getBottom() - childGraph.getTop());
                if (LayoutConstants.NODE_DIMENSIONS_INCLUDE_LABELS) {
                  var width = childGraph.getRight() - childGraph.getLeft();
                  var height = childGraph.getBottom() - childGraph.getTop();
                  if (this.labelWidth > width) {
                    this.rect.x -= (this.labelWidth - width) / 2;
                    this.setWidth(this.labelWidth);
                  }
                  if (this.labelHeight > height) {
                    if (this.labelPos == "center") {
                      this.rect.y -= (this.labelHeight - height) / 2;
                    } else if (this.labelPos == "top") {
                      this.rect.y -= this.labelHeight - height;
                    }
                    this.setHeight(this.labelHeight);
                  }
                }
              }
            };
            LNode.prototype.getInclusionTreeDepth = function() {
              if (this.inclusionTreeDepth == Integer.MAX_VALUE) {
                throw "assert failed";
              }
              return this.inclusionTreeDepth;
            };
            LNode.prototype.transform = function(trans) {
              var left = this.rect.x;
              if (left > LayoutConstants.WORLD_BOUNDARY) {
                left = LayoutConstants.WORLD_BOUNDARY;
              } else if (left < -LayoutConstants.WORLD_BOUNDARY) {
                left = -LayoutConstants.WORLD_BOUNDARY;
              }
              var top = this.rect.y;
              if (top > LayoutConstants.WORLD_BOUNDARY) {
                top = LayoutConstants.WORLD_BOUNDARY;
              } else if (top < -LayoutConstants.WORLD_BOUNDARY) {
                top = -LayoutConstants.WORLD_BOUNDARY;
              }
              var leftTop = new PointD(left, top);
              var vLeftTop = trans.inverseTransformPoint(leftTop);
              this.setLocation(vLeftTop.x, vLeftTop.y);
            };
            LNode.prototype.getLeft = function() {
              return this.rect.x;
            };
            LNode.prototype.getRight = function() {
              return this.rect.x + this.rect.width;
            };
            LNode.prototype.getTop = function() {
              return this.rect.y;
            };
            LNode.prototype.getBottom = function() {
              return this.rect.y + this.rect.height;
            };
            LNode.prototype.getParent = function() {
              if (this.owner == null) {
                return null;
              }
              return this.owner.getParent();
            };
            module2.exports = LNode;
          },
          /* 4 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function PointD(x, y) {
              if (x == null && y == null) {
                this.x = 0;
                this.y = 0;
              } else {
                this.x = x;
                this.y = y;
              }
            }
            PointD.prototype.getX = function() {
              return this.x;
            };
            PointD.prototype.getY = function() {
              return this.y;
            };
            PointD.prototype.setX = function(x) {
              this.x = x;
            };
            PointD.prototype.setY = function(y) {
              this.y = y;
            };
            PointD.prototype.getDifference = function(pt) {
              return new DimensionD(this.x - pt.x, this.y - pt.y);
            };
            PointD.prototype.getCopy = function() {
              return new PointD(this.x, this.y);
            };
            PointD.prototype.translate = function(dim) {
              this.x += dim.width;
              this.y += dim.height;
              return this;
            };
            module2.exports = PointD;
          },
          /* 5 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var LGraphObject = __webpack_require__(2);
            var Integer = __webpack_require__(10);
            var LayoutConstants = __webpack_require__(0);
            var LGraphManager = __webpack_require__(6);
            var LNode = __webpack_require__(3);
            var LEdge = __webpack_require__(1);
            var RectangleD = __webpack_require__(13);
            var Point2 = __webpack_require__(12);
            var LinkedList = __webpack_require__(11);
            function LGraph(parent, obj2, vGraph) {
              LGraphObject.call(this, vGraph);
              this.estimatedSize = Integer.MIN_VALUE;
              this.margin = LayoutConstants.DEFAULT_GRAPH_MARGIN;
              this.edges = [];
              this.nodes = [];
              this.isConnected = false;
              this.parent = parent;
              if (obj2 != null && obj2 instanceof LGraphManager) {
                this.graphManager = obj2;
              } else if (obj2 != null && obj2 instanceof Layout) {
                this.graphManager = obj2.graphManager;
              }
            }
            LGraph.prototype = Object.create(LGraphObject.prototype);
            for (var prop in LGraphObject) {
              LGraph[prop] = LGraphObject[prop];
            }
            LGraph.prototype.getNodes = function() {
              return this.nodes;
            };
            LGraph.prototype.getEdges = function() {
              return this.edges;
            };
            LGraph.prototype.getGraphManager = function() {
              return this.graphManager;
            };
            LGraph.prototype.getParent = function() {
              return this.parent;
            };
            LGraph.prototype.getLeft = function() {
              return this.left;
            };
            LGraph.prototype.getRight = function() {
              return this.right;
            };
            LGraph.prototype.getTop = function() {
              return this.top;
            };
            LGraph.prototype.getBottom = function() {
              return this.bottom;
            };
            LGraph.prototype.isConnected = function() {
              return this.isConnected;
            };
            LGraph.prototype.add = function(obj1, sourceNode, targetNode) {
              if (sourceNode == null && targetNode == null) {
                var newNode = obj1;
                if (this.graphManager == null) {
                  throw "Graph has no graph mgr!";
                }
                if (this.getNodes().indexOf(newNode) > -1) {
                  throw "Node already in graph!";
                }
                newNode.owner = this;
                this.getNodes().push(newNode);
                return newNode;
              } else {
                var newEdge = obj1;
                if (!(this.getNodes().indexOf(sourceNode) > -1 && this.getNodes().indexOf(targetNode) > -1)) {
                  throw "Source or target not in graph!";
                }
                if (!(sourceNode.owner == targetNode.owner && sourceNode.owner == this)) {
                  throw "Both owners must be this graph!";
                }
                if (sourceNode.owner != targetNode.owner) {
                  return null;
                }
                newEdge.source = sourceNode;
                newEdge.target = targetNode;
                newEdge.isInterGraph = false;
                this.getEdges().push(newEdge);
                sourceNode.edges.push(newEdge);
                if (targetNode != sourceNode) {
                  targetNode.edges.push(newEdge);
                }
                return newEdge;
              }
            };
            LGraph.prototype.remove = function(obj) {
              var node = obj;
              if (obj instanceof LNode) {
                if (node == null) {
                  throw "Node is null!";
                }
                if (!(node.owner != null && node.owner == this)) {
                  throw "Owner graph is invalid!";
                }
                if (this.graphManager == null) {
                  throw "Owner graph manager is invalid!";
                }
                var edgesToBeRemoved = node.edges.slice();
                var edge;
                var s = edgesToBeRemoved.length;
                for (var i = 0; i < s; i++) {
                  edge = edgesToBeRemoved[i];
                  if (edge.isInterGraph) {
                    this.graphManager.remove(edge);
                  } else {
                    edge.source.owner.remove(edge);
                  }
                }
                var index = this.nodes.indexOf(node);
                if (index == -1) {
                  throw "Node not in owner node list!";
                }
                this.nodes.splice(index, 1);
              } else if (obj instanceof LEdge) {
                var edge = obj;
                if (edge == null) {
                  throw "Edge is null!";
                }
                if (!(edge.source != null && edge.target != null)) {
                  throw "Source and/or target is null!";
                }
                if (!(edge.source.owner != null && edge.target.owner != null && edge.source.owner == this && edge.target.owner == this)) {
                  throw "Source and/or target owner is invalid!";
                }
                var sourceIndex = edge.source.edges.indexOf(edge);
                var targetIndex = edge.target.edges.indexOf(edge);
                if (!(sourceIndex > -1 && targetIndex > -1)) {
                  throw "Source and/or target doesn't know this edge!";
                }
                edge.source.edges.splice(sourceIndex, 1);
                if (edge.target != edge.source) {
                  edge.target.edges.splice(targetIndex, 1);
                }
                var index = edge.source.owner.getEdges().indexOf(edge);
                if (index == -1) {
                  throw "Not in owner's edge list!";
                }
                edge.source.owner.getEdges().splice(index, 1);
              }
            };
            LGraph.prototype.updateLeftTop = function() {
              var top = Integer.MAX_VALUE;
              var left = Integer.MAX_VALUE;
              var nodeTop;
              var nodeLeft;
              var margin;
              var nodes = this.getNodes();
              var s = nodes.length;
              for (var i = 0; i < s; i++) {
                var lNode = nodes[i];
                nodeTop = lNode.getTop();
                nodeLeft = lNode.getLeft();
                if (top > nodeTop) {
                  top = nodeTop;
                }
                if (left > nodeLeft) {
                  left = nodeLeft;
                }
              }
              if (top == Integer.MAX_VALUE) {
                return null;
              }
              if (nodes[0].getParent().paddingLeft != void 0) {
                margin = nodes[0].getParent().paddingLeft;
              } else {
                margin = this.margin;
              }
              this.left = left - margin;
              this.top = top - margin;
              return new Point2(this.left, this.top);
            };
            LGraph.prototype.updateBounds = function(recursive) {
              var left = Integer.MAX_VALUE;
              var right = -Integer.MAX_VALUE;
              var top = Integer.MAX_VALUE;
              var bottom = -Integer.MAX_VALUE;
              var nodeLeft;
              var nodeRight;
              var nodeTop;
              var nodeBottom;
              var margin;
              var nodes = this.nodes;
              var s = nodes.length;
              for (var i = 0; i < s; i++) {
                var lNode = nodes[i];
                if (recursive && lNode.child != null) {
                  lNode.updateBounds();
                }
                nodeLeft = lNode.getLeft();
                nodeRight = lNode.getRight();
                nodeTop = lNode.getTop();
                nodeBottom = lNode.getBottom();
                if (left > nodeLeft) {
                  left = nodeLeft;
                }
                if (right < nodeRight) {
                  right = nodeRight;
                }
                if (top > nodeTop) {
                  top = nodeTop;
                }
                if (bottom < nodeBottom) {
                  bottom = nodeBottom;
                }
              }
              var boundingRect = new RectangleD(left, top, right - left, bottom - top);
              if (left == Integer.MAX_VALUE) {
                this.left = this.parent.getLeft();
                this.right = this.parent.getRight();
                this.top = this.parent.getTop();
                this.bottom = this.parent.getBottom();
              }
              if (nodes[0].getParent().paddingLeft != void 0) {
                margin = nodes[0].getParent().paddingLeft;
              } else {
                margin = this.margin;
              }
              this.left = boundingRect.x - margin;
              this.right = boundingRect.x + boundingRect.width + margin;
              this.top = boundingRect.y - margin;
              this.bottom = boundingRect.y + boundingRect.height + margin;
            };
            LGraph.calculateBounds = function(nodes) {
              var left = Integer.MAX_VALUE;
              var right = -Integer.MAX_VALUE;
              var top = Integer.MAX_VALUE;
              var bottom = -Integer.MAX_VALUE;
              var nodeLeft;
              var nodeRight;
              var nodeTop;
              var nodeBottom;
              var s = nodes.length;
              for (var i = 0; i < s; i++) {
                var lNode = nodes[i];
                nodeLeft = lNode.getLeft();
                nodeRight = lNode.getRight();
                nodeTop = lNode.getTop();
                nodeBottom = lNode.getBottom();
                if (left > nodeLeft) {
                  left = nodeLeft;
                }
                if (right < nodeRight) {
                  right = nodeRight;
                }
                if (top > nodeTop) {
                  top = nodeTop;
                }
                if (bottom < nodeBottom) {
                  bottom = nodeBottom;
                }
              }
              var boundingRect = new RectangleD(left, top, right - left, bottom - top);
              return boundingRect;
            };
            LGraph.prototype.getInclusionTreeDepth = function() {
              if (this == this.graphManager.getRoot()) {
                return 1;
              } else {
                return this.parent.getInclusionTreeDepth();
              }
            };
            LGraph.prototype.getEstimatedSize = function() {
              if (this.estimatedSize == Integer.MIN_VALUE) {
                throw "assert failed";
              }
              return this.estimatedSize;
            };
            LGraph.prototype.calcEstimatedSize = function() {
              var size = 0;
              var nodes = this.nodes;
              var s = nodes.length;
              for (var i = 0; i < s; i++) {
                var lNode = nodes[i];
                size += lNode.calcEstimatedSize();
              }
              if (size == 0) {
                this.estimatedSize = LayoutConstants.EMPTY_COMPOUND_NODE_SIZE;
              } else {
                this.estimatedSize = size / Math.sqrt(this.nodes.length);
              }
              return this.estimatedSize;
            };
            LGraph.prototype.updateConnected = function() {
              var self = this;
              if (this.nodes.length == 0) {
                this.isConnected = true;
                return;
              }
              var queue = new LinkedList();
              var visited = /* @__PURE__ */ new Set();
              var currentNode = this.nodes[0];
              var neighborEdges;
              var currentNeighbor;
              var childrenOfNode = currentNode.withChildren();
              childrenOfNode.forEach(function(node) {
                queue.push(node);
                visited.add(node);
              });
              while (queue.length !== 0) {
                currentNode = queue.shift();
                neighborEdges = currentNode.getEdges();
                var size = neighborEdges.length;
                for (var i = 0; i < size; i++) {
                  var neighborEdge = neighborEdges[i];
                  currentNeighbor = neighborEdge.getOtherEndInGraph(currentNode, this);
                  if (currentNeighbor != null && !visited.has(currentNeighbor)) {
                    var childrenOfNeighbor = currentNeighbor.withChildren();
                    childrenOfNeighbor.forEach(function(node) {
                      queue.push(node);
                      visited.add(node);
                    });
                  }
                }
              }
              this.isConnected = false;
              if (visited.size >= this.nodes.length) {
                var noOfVisitedInThisGraph = 0;
                visited.forEach(function(visitedNode) {
                  if (visitedNode.owner == self) {
                    noOfVisitedInThisGraph++;
                  }
                });
                if (noOfVisitedInThisGraph == this.nodes.length) {
                  this.isConnected = true;
                }
              }
            };
            module2.exports = LGraph;
          },
          /* 6 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var LGraph;
            var LEdge = __webpack_require__(1);
            function LGraphManager(layout) {
              LGraph = __webpack_require__(5);
              this.layout = layout;
              this.graphs = [];
              this.edges = [];
            }
            LGraphManager.prototype.addRoot = function() {
              var ngraph = this.layout.newGraph();
              var nnode = this.layout.newNode(null);
              var root = this.add(ngraph, nnode);
              this.setRootGraph(root);
              return this.rootGraph;
            };
            LGraphManager.prototype.add = function(newGraph, parentNode, newEdge, sourceNode, targetNode) {
              if (newEdge == null && sourceNode == null && targetNode == null) {
                if (newGraph == null) {
                  throw "Graph is null!";
                }
                if (parentNode == null) {
                  throw "Parent node is null!";
                }
                if (this.graphs.indexOf(newGraph) > -1) {
                  throw "Graph already in this graph mgr!";
                }
                this.graphs.push(newGraph);
                if (newGraph.parent != null) {
                  throw "Already has a parent!";
                }
                if (parentNode.child != null) {
                  throw "Already has a child!";
                }
                newGraph.parent = parentNode;
                parentNode.child = newGraph;
                return newGraph;
              } else {
                targetNode = newEdge;
                sourceNode = parentNode;
                newEdge = newGraph;
                var sourceGraph = sourceNode.getOwner();
                var targetGraph = targetNode.getOwner();
                if (!(sourceGraph != null && sourceGraph.getGraphManager() == this)) {
                  throw "Source not in this graph mgr!";
                }
                if (!(targetGraph != null && targetGraph.getGraphManager() == this)) {
                  throw "Target not in this graph mgr!";
                }
                if (sourceGraph == targetGraph) {
                  newEdge.isInterGraph = false;
                  return sourceGraph.add(newEdge, sourceNode, targetNode);
                } else {
                  newEdge.isInterGraph = true;
                  newEdge.source = sourceNode;
                  newEdge.target = targetNode;
                  if (this.edges.indexOf(newEdge) > -1) {
                    throw "Edge already in inter-graph edge list!";
                  }
                  this.edges.push(newEdge);
                  if (!(newEdge.source != null && newEdge.target != null)) {
                    throw "Edge source and/or target is null!";
                  }
                  if (!(newEdge.source.edges.indexOf(newEdge) == -1 && newEdge.target.edges.indexOf(newEdge) == -1)) {
                    throw "Edge already in source and/or target incidency list!";
                  }
                  newEdge.source.edges.push(newEdge);
                  newEdge.target.edges.push(newEdge);
                  return newEdge;
                }
              }
            };
            LGraphManager.prototype.remove = function(lObj) {
              if (lObj instanceof LGraph) {
                var graph = lObj;
                if (graph.getGraphManager() != this) {
                  throw "Graph not in this graph mgr";
                }
                if (!(graph == this.rootGraph || graph.parent != null && graph.parent.graphManager == this)) {
                  throw "Invalid parent node!";
                }
                var edgesToBeRemoved = [];
                edgesToBeRemoved = edgesToBeRemoved.concat(graph.getEdges());
                var edge;
                var s = edgesToBeRemoved.length;
                for (var i = 0; i < s; i++) {
                  edge = edgesToBeRemoved[i];
                  graph.remove(edge);
                }
                var nodesToBeRemoved = [];
                nodesToBeRemoved = nodesToBeRemoved.concat(graph.getNodes());
                var node;
                s = nodesToBeRemoved.length;
                for (var i = 0; i < s; i++) {
                  node = nodesToBeRemoved[i];
                  graph.remove(node);
                }
                if (graph == this.rootGraph) {
                  this.setRootGraph(null);
                }
                var index = this.graphs.indexOf(graph);
                this.graphs.splice(index, 1);
                graph.parent = null;
              } else if (lObj instanceof LEdge) {
                edge = lObj;
                if (edge == null) {
                  throw "Edge is null!";
                }
                if (!edge.isInterGraph) {
                  throw "Not an inter-graph edge!";
                }
                if (!(edge.source != null && edge.target != null)) {
                  throw "Source and/or target is null!";
                }
                if (!(edge.source.edges.indexOf(edge) != -1 && edge.target.edges.indexOf(edge) != -1)) {
                  throw "Source and/or target doesn't know this edge!";
                }
                var index = edge.source.edges.indexOf(edge);
                edge.source.edges.splice(index, 1);
                index = edge.target.edges.indexOf(edge);
                edge.target.edges.splice(index, 1);
                if (!(edge.source.owner != null && edge.source.owner.getGraphManager() != null)) {
                  throw "Edge owner graph or owner graph manager is null!";
                }
                if (edge.source.owner.getGraphManager().edges.indexOf(edge) == -1) {
                  throw "Not in owner graph manager's edge list!";
                }
                var index = edge.source.owner.getGraphManager().edges.indexOf(edge);
                edge.source.owner.getGraphManager().edges.splice(index, 1);
              }
            };
            LGraphManager.prototype.updateBounds = function() {
              this.rootGraph.updateBounds(true);
            };
            LGraphManager.prototype.getGraphs = function() {
              return this.graphs;
            };
            LGraphManager.prototype.getAllNodes = function() {
              if (this.allNodes == null) {
                var nodeList = [];
                var graphs = this.getGraphs();
                var s = graphs.length;
                for (var i = 0; i < s; i++) {
                  nodeList = nodeList.concat(graphs[i].getNodes());
                }
                this.allNodes = nodeList;
              }
              return this.allNodes;
            };
            LGraphManager.prototype.resetAllNodes = function() {
              this.allNodes = null;
            };
            LGraphManager.prototype.resetAllEdges = function() {
              this.allEdges = null;
            };
            LGraphManager.prototype.resetAllNodesToApplyGravitation = function() {
              this.allNodesToApplyGravitation = null;
            };
            LGraphManager.prototype.getAllEdges = function() {
              if (this.allEdges == null) {
                var edgeList = [];
                var graphs = this.getGraphs();
                graphs.length;
                for (var i = 0; i < graphs.length; i++) {
                  edgeList = edgeList.concat(graphs[i].getEdges());
                }
                edgeList = edgeList.concat(this.edges);
                this.allEdges = edgeList;
              }
              return this.allEdges;
            };
            LGraphManager.prototype.getAllNodesToApplyGravitation = function() {
              return this.allNodesToApplyGravitation;
            };
            LGraphManager.prototype.setAllNodesToApplyGravitation = function(nodeList) {
              if (this.allNodesToApplyGravitation != null) {
                throw "assert failed";
              }
              this.allNodesToApplyGravitation = nodeList;
            };
            LGraphManager.prototype.getRoot = function() {
              return this.rootGraph;
            };
            LGraphManager.prototype.setRootGraph = function(graph) {
              if (graph.getGraphManager() != this) {
                throw "Root not in this graph mgr!";
              }
              this.rootGraph = graph;
              if (graph.parent == null) {
                graph.parent = this.layout.newNode("Root node");
              }
            };
            LGraphManager.prototype.getLayout = function() {
              return this.layout;
            };
            LGraphManager.prototype.isOneAncestorOfOther = function(firstNode, secondNode) {
              if (!(firstNode != null && secondNode != null)) {
                throw "assert failed";
              }
              if (firstNode == secondNode) {
                return true;
              }
              var ownerGraph = firstNode.getOwner();
              var parentNode;
              do {
                parentNode = ownerGraph.getParent();
                if (parentNode == null) {
                  break;
                }
                if (parentNode == secondNode) {
                  return true;
                }
                ownerGraph = parentNode.getOwner();
                if (ownerGraph == null) {
                  break;
                }
              } while (true);
              ownerGraph = secondNode.getOwner();
              do {
                parentNode = ownerGraph.getParent();
                if (parentNode == null) {
                  break;
                }
                if (parentNode == firstNode) {
                  return true;
                }
                ownerGraph = parentNode.getOwner();
                if (ownerGraph == null) {
                  break;
                }
              } while (true);
              return false;
            };
            LGraphManager.prototype.calcLowestCommonAncestors = function() {
              var edge;
              var sourceNode;
              var targetNode;
              var sourceAncestorGraph;
              var targetAncestorGraph;
              var edges = this.getAllEdges();
              var s = edges.length;
              for (var i = 0; i < s; i++) {
                edge = edges[i];
                sourceNode = edge.source;
                targetNode = edge.target;
                edge.lca = null;
                edge.sourceInLca = sourceNode;
                edge.targetInLca = targetNode;
                if (sourceNode == targetNode) {
                  edge.lca = sourceNode.getOwner();
                  continue;
                }
                sourceAncestorGraph = sourceNode.getOwner();
                while (edge.lca == null) {
                  edge.targetInLca = targetNode;
                  targetAncestorGraph = targetNode.getOwner();
                  while (edge.lca == null) {
                    if (targetAncestorGraph == sourceAncestorGraph) {
                      edge.lca = targetAncestorGraph;
                      break;
                    }
                    if (targetAncestorGraph == this.rootGraph) {
                      break;
                    }
                    if (edge.lca != null) {
                      throw "assert failed";
                    }
                    edge.targetInLca = targetAncestorGraph.getParent();
                    targetAncestorGraph = edge.targetInLca.getOwner();
                  }
                  if (sourceAncestorGraph == this.rootGraph) {
                    break;
                  }
                  if (edge.lca == null) {
                    edge.sourceInLca = sourceAncestorGraph.getParent();
                    sourceAncestorGraph = edge.sourceInLca.getOwner();
                  }
                }
                if (edge.lca == null) {
                  throw "assert failed";
                }
              }
            };
            LGraphManager.prototype.calcLowestCommonAncestor = function(firstNode, secondNode) {
              if (firstNode == secondNode) {
                return firstNode.getOwner();
              }
              var firstOwnerGraph = firstNode.getOwner();
              do {
                if (firstOwnerGraph == null) {
                  break;
                }
                var secondOwnerGraph = secondNode.getOwner();
                do {
                  if (secondOwnerGraph == null) {
                    break;
                  }
                  if (secondOwnerGraph == firstOwnerGraph) {
                    return secondOwnerGraph;
                  }
                  secondOwnerGraph = secondOwnerGraph.getParent().getOwner();
                } while (true);
                firstOwnerGraph = firstOwnerGraph.getParent().getOwner();
              } while (true);
              return firstOwnerGraph;
            };
            LGraphManager.prototype.calcInclusionTreeDepths = function(graph, depth) {
              if (graph == null && depth == null) {
                graph = this.rootGraph;
                depth = 1;
              }
              var node;
              var nodes = graph.getNodes();
              var s = nodes.length;
              for (var i = 0; i < s; i++) {
                node = nodes[i];
                node.inclusionTreeDepth = depth;
                if (node.child != null) {
                  this.calcInclusionTreeDepths(node.child, depth + 1);
                }
              }
            };
            LGraphManager.prototype.includesInvalidEdge = function() {
              var edge;
              var s = this.edges.length;
              for (var i = 0; i < s; i++) {
                edge = this.edges[i];
                if (this.isOneAncestorOfOther(edge.source, edge.target)) {
                  return true;
                }
              }
              return false;
            };
            module2.exports = LGraphManager;
          },
          /* 7 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var LayoutConstants = __webpack_require__(0);
            function FDLayoutConstants() {
            }
            for (var prop in LayoutConstants) {
              FDLayoutConstants[prop] = LayoutConstants[prop];
            }
            FDLayoutConstants.MAX_ITERATIONS = 2500;
            FDLayoutConstants.DEFAULT_EDGE_LENGTH = 50;
            FDLayoutConstants.DEFAULT_SPRING_STRENGTH = 0.45;
            FDLayoutConstants.DEFAULT_REPULSION_STRENGTH = 4500;
            FDLayoutConstants.DEFAULT_GRAVITY_STRENGTH = 0.4;
            FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH = 1;
            FDLayoutConstants.DEFAULT_GRAVITY_RANGE_FACTOR = 3.8;
            FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = 1.5;
            FDLayoutConstants.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION = true;
            FDLayoutConstants.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION = true;
            FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL = 0.3;
            FDLayoutConstants.COOLING_ADAPTATION_FACTOR = 0.33;
            FDLayoutConstants.ADAPTATION_LOWER_NODE_LIMIT = 1e3;
            FDLayoutConstants.ADAPTATION_UPPER_NODE_LIMIT = 5e3;
            FDLayoutConstants.MAX_NODE_DISPLACEMENT_INCREMENTAL = 100;
            FDLayoutConstants.MAX_NODE_DISPLACEMENT = FDLayoutConstants.MAX_NODE_DISPLACEMENT_INCREMENTAL * 3;
            FDLayoutConstants.MIN_REPULSION_DIST = FDLayoutConstants.DEFAULT_EDGE_LENGTH / 10;
            FDLayoutConstants.CONVERGENCE_CHECK_PERIOD = 100;
            FDLayoutConstants.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = 0.1;
            FDLayoutConstants.MIN_EDGE_LENGTH = 1;
            FDLayoutConstants.GRID_CALCULATION_CHECK_PERIOD = 10;
            module2.exports = FDLayoutConstants;
          },
          /* 8 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var Point2 = __webpack_require__(12);
            function IGeometry() {
            }
            IGeometry.calcSeparationAmount = function(rectA, rectB, overlapAmount, separationBuffer) {
              if (!rectA.intersects(rectB)) {
                throw "assert failed";
              }
              var directions = new Array(2);
              this.decideDirectionsForOverlappingNodes(rectA, rectB, directions);
              overlapAmount[0] = Math.min(rectA.getRight(), rectB.getRight()) - Math.max(rectA.x, rectB.x);
              overlapAmount[1] = Math.min(rectA.getBottom(), rectB.getBottom()) - Math.max(rectA.y, rectB.y);
              if (rectA.getX() <= rectB.getX() && rectA.getRight() >= rectB.getRight()) {
                overlapAmount[0] += Math.min(rectB.getX() - rectA.getX(), rectA.getRight() - rectB.getRight());
              } else if (rectB.getX() <= rectA.getX() && rectB.getRight() >= rectA.getRight()) {
                overlapAmount[0] += Math.min(rectA.getX() - rectB.getX(), rectB.getRight() - rectA.getRight());
              }
              if (rectA.getY() <= rectB.getY() && rectA.getBottom() >= rectB.getBottom()) {
                overlapAmount[1] += Math.min(rectB.getY() - rectA.getY(), rectA.getBottom() - rectB.getBottom());
              } else if (rectB.getY() <= rectA.getY() && rectB.getBottom() >= rectA.getBottom()) {
                overlapAmount[1] += Math.min(rectA.getY() - rectB.getY(), rectB.getBottom() - rectA.getBottom());
              }
              var slope = Math.abs((rectB.getCenterY() - rectA.getCenterY()) / (rectB.getCenterX() - rectA.getCenterX()));
              if (rectB.getCenterY() === rectA.getCenterY() && rectB.getCenterX() === rectA.getCenterX()) {
                slope = 1;
              }
              var moveByY = slope * overlapAmount[0];
              var moveByX = overlapAmount[1] / slope;
              if (overlapAmount[0] < moveByX) {
                moveByX = overlapAmount[0];
              } else {
                moveByY = overlapAmount[1];
              }
              overlapAmount[0] = -1 * directions[0] * (moveByX / 2 + separationBuffer);
              overlapAmount[1] = -1 * directions[1] * (moveByY / 2 + separationBuffer);
            };
            IGeometry.decideDirectionsForOverlappingNodes = function(rectA, rectB, directions) {
              if (rectA.getCenterX() < rectB.getCenterX()) {
                directions[0] = -1;
              } else {
                directions[0] = 1;
              }
              if (rectA.getCenterY() < rectB.getCenterY()) {
                directions[1] = -1;
              } else {
                directions[1] = 1;
              }
            };
            IGeometry.getIntersection2 = function(rectA, rectB, result) {
              var p1x = rectA.getCenterX();
              var p1y = rectA.getCenterY();
              var p2x = rectB.getCenterX();
              var p2y = rectB.getCenterY();
              if (rectA.intersects(rectB)) {
                result[0] = p1x;
                result[1] = p1y;
                result[2] = p2x;
                result[3] = p2y;
                return true;
              }
              var topLeftAx = rectA.getX();
              var topLeftAy = rectA.getY();
              var topRightAx = rectA.getRight();
              var bottomLeftAx = rectA.getX();
              var bottomLeftAy = rectA.getBottom();
              var bottomRightAx = rectA.getRight();
              var halfWidthA = rectA.getWidthHalf();
              var halfHeightA = rectA.getHeightHalf();
              var topLeftBx = rectB.getX();
              var topLeftBy = rectB.getY();
              var topRightBx = rectB.getRight();
              var bottomLeftBx = rectB.getX();
              var bottomLeftBy = rectB.getBottom();
              var bottomRightBx = rectB.getRight();
              var halfWidthB = rectB.getWidthHalf();
              var halfHeightB = rectB.getHeightHalf();
              var clipPointAFound = false;
              var clipPointBFound = false;
              if (p1x === p2x) {
                if (p1y > p2y) {
                  result[0] = p1x;
                  result[1] = topLeftAy;
                  result[2] = p2x;
                  result[3] = bottomLeftBy;
                  return false;
                } else if (p1y < p2y) {
                  result[0] = p1x;
                  result[1] = bottomLeftAy;
                  result[2] = p2x;
                  result[3] = topLeftBy;
                  return false;
                } else
                  ;
              } else if (p1y === p2y) {
                if (p1x > p2x) {
                  result[0] = topLeftAx;
                  result[1] = p1y;
                  result[2] = topRightBx;
                  result[3] = p2y;
                  return false;
                } else if (p1x < p2x) {
                  result[0] = topRightAx;
                  result[1] = p1y;
                  result[2] = topLeftBx;
                  result[3] = p2y;
                  return false;
                } else
                  ;
              } else {
                var slopeA = rectA.height / rectA.width;
                var slopeB = rectB.height / rectB.width;
                var slopePrime = (p2y - p1y) / (p2x - p1x);
                var cardinalDirectionA = void 0;
                var cardinalDirectionB = void 0;
                var tempPointAx = void 0;
                var tempPointAy = void 0;
                var tempPointBx = void 0;
                var tempPointBy = void 0;
                if (-slopeA === slopePrime) {
                  if (p1x > p2x) {
                    result[0] = bottomLeftAx;
                    result[1] = bottomLeftAy;
                    clipPointAFound = true;
                  } else {
                    result[0] = topRightAx;
                    result[1] = topLeftAy;
                    clipPointAFound = true;
                  }
                } else if (slopeA === slopePrime) {
                  if (p1x > p2x) {
                    result[0] = topLeftAx;
                    result[1] = topLeftAy;
                    clipPointAFound = true;
                  } else {
                    result[0] = bottomRightAx;
                    result[1] = bottomLeftAy;
                    clipPointAFound = true;
                  }
                }
                if (-slopeB === slopePrime) {
                  if (p2x > p1x) {
                    result[2] = bottomLeftBx;
                    result[3] = bottomLeftBy;
                    clipPointBFound = true;
                  } else {
                    result[2] = topRightBx;
                    result[3] = topLeftBy;
                    clipPointBFound = true;
                  }
                } else if (slopeB === slopePrime) {
                  if (p2x > p1x) {
                    result[2] = topLeftBx;
                    result[3] = topLeftBy;
                    clipPointBFound = true;
                  } else {
                    result[2] = bottomRightBx;
                    result[3] = bottomLeftBy;
                    clipPointBFound = true;
                  }
                }
                if (clipPointAFound && clipPointBFound) {
                  return false;
                }
                if (p1x > p2x) {
                  if (p1y > p2y) {
                    cardinalDirectionA = this.getCardinalDirection(slopeA, slopePrime, 4);
                    cardinalDirectionB = this.getCardinalDirection(slopeB, slopePrime, 2);
                  } else {
                    cardinalDirectionA = this.getCardinalDirection(-slopeA, slopePrime, 3);
                    cardinalDirectionB = this.getCardinalDirection(-slopeB, slopePrime, 1);
                  }
                } else {
                  if (p1y > p2y) {
                    cardinalDirectionA = this.getCardinalDirection(-slopeA, slopePrime, 1);
                    cardinalDirectionB = this.getCardinalDirection(-slopeB, slopePrime, 3);
                  } else {
                    cardinalDirectionA = this.getCardinalDirection(slopeA, slopePrime, 2);
                    cardinalDirectionB = this.getCardinalDirection(slopeB, slopePrime, 4);
                  }
                }
                if (!clipPointAFound) {
                  switch (cardinalDirectionA) {
                    case 1:
                      tempPointAy = topLeftAy;
                      tempPointAx = p1x + -halfHeightA / slopePrime;
                      result[0] = tempPointAx;
                      result[1] = tempPointAy;
                      break;
                    case 2:
                      tempPointAx = bottomRightAx;
                      tempPointAy = p1y + halfWidthA * slopePrime;
                      result[0] = tempPointAx;
                      result[1] = tempPointAy;
                      break;
                    case 3:
                      tempPointAy = bottomLeftAy;
                      tempPointAx = p1x + halfHeightA / slopePrime;
                      result[0] = tempPointAx;
                      result[1] = tempPointAy;
                      break;
                    case 4:
                      tempPointAx = bottomLeftAx;
                      tempPointAy = p1y + -halfWidthA * slopePrime;
                      result[0] = tempPointAx;
                      result[1] = tempPointAy;
                      break;
                  }
                }
                if (!clipPointBFound) {
                  switch (cardinalDirectionB) {
                    case 1:
                      tempPointBy = topLeftBy;
                      tempPointBx = p2x + -halfHeightB / slopePrime;
                      result[2] = tempPointBx;
                      result[3] = tempPointBy;
                      break;
                    case 2:
                      tempPointBx = bottomRightBx;
                      tempPointBy = p2y + halfWidthB * slopePrime;
                      result[2] = tempPointBx;
                      result[3] = tempPointBy;
                      break;
                    case 3:
                      tempPointBy = bottomLeftBy;
                      tempPointBx = p2x + halfHeightB / slopePrime;
                      result[2] = tempPointBx;
                      result[3] = tempPointBy;
                      break;
                    case 4:
                      tempPointBx = bottomLeftBx;
                      tempPointBy = p2y + -halfWidthB * slopePrime;
                      result[2] = tempPointBx;
                      result[3] = tempPointBy;
                      break;
                  }
                }
              }
              return false;
            };
            IGeometry.getCardinalDirection = function(slope, slopePrime, line) {
              if (slope > slopePrime) {
                return line;
              } else {
                return 1 + line % 4;
              }
            };
            IGeometry.getIntersection = function(s1, s2, f1, f2) {
              if (f2 == null) {
                return this.getIntersection2(s1, s2, f1);
              }
              var x1 = s1.x;
              var y1 = s1.y;
              var x2 = s2.x;
              var y2 = s2.y;
              var x3 = f1.x;
              var y3 = f1.y;
              var x4 = f2.x;
              var y4 = f2.y;
              var x = void 0, y = void 0;
              var a1 = void 0, a2 = void 0, b1 = void 0, b2 = void 0, c1 = void 0, c2 = void 0;
              var denom = void 0;
              a1 = y2 - y1;
              b1 = x1 - x2;
              c1 = x2 * y1 - x1 * y2;
              a2 = y4 - y3;
              b2 = x3 - x4;
              c2 = x4 * y3 - x3 * y4;
              denom = a1 * b2 - a2 * b1;
              if (denom === 0) {
                return null;
              }
              x = (b1 * c2 - b2 * c1) / denom;
              y = (a2 * c1 - a1 * c2) / denom;
              return new Point2(x, y);
            };
            IGeometry.angleOfVector = function(Cx, Cy, Nx, Ny) {
              var C_angle = void 0;
              if (Cx !== Nx) {
                C_angle = Math.atan((Ny - Cy) / (Nx - Cx));
                if (Nx < Cx) {
                  C_angle += Math.PI;
                } else if (Ny < Cy) {
                  C_angle += this.TWO_PI;
                }
              } else if (Ny < Cy) {
                C_angle = this.ONE_AND_HALF_PI;
              } else {
                C_angle = this.HALF_PI;
              }
              return C_angle;
            };
            IGeometry.doIntersect = function(p1, p2, p3, p4) {
              var a = p1.x;
              var b = p1.y;
              var c = p2.x;
              var d = p2.y;
              var p = p3.x;
              var q = p3.y;
              var r = p4.x;
              var s = p4.y;
              var det = (c - a) * (s - q) - (r - p) * (d - b);
              if (det === 0) {
                return false;
              } else {
                var lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                var gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
                return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
              }
            };
            IGeometry.HALF_PI = 0.5 * Math.PI;
            IGeometry.ONE_AND_HALF_PI = 1.5 * Math.PI;
            IGeometry.TWO_PI = 2 * Math.PI;
            IGeometry.THREE_PI = 3 * Math.PI;
            module2.exports = IGeometry;
          },
          /* 9 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function IMath() {
            }
            IMath.sign = function(value) {
              if (value > 0) {
                return 1;
              } else if (value < 0) {
                return -1;
              } else {
                return 0;
              }
            };
            IMath.floor = function(value) {
              return value < 0 ? Math.ceil(value) : Math.floor(value);
            };
            IMath.ceil = function(value) {
              return value < 0 ? Math.floor(value) : Math.ceil(value);
            };
            module2.exports = IMath;
          },
          /* 10 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function Integer() {
            }
            Integer.MAX_VALUE = 2147483647;
            Integer.MIN_VALUE = -2147483648;
            module2.exports = Integer;
          },
          /* 11 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var _createClass = function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            var nodeFrom = function nodeFrom2(value) {
              return { value, next: null, prev: null };
            };
            var add = function add2(prev, node, next, list) {
              if (prev !== null) {
                prev.next = node;
              } else {
                list.head = node;
              }
              if (next !== null) {
                next.prev = node;
              } else {
                list.tail = node;
              }
              node.prev = prev;
              node.next = next;
              list.length++;
              return node;
            };
            var _remove = function _remove2(node, list) {
              var prev = node.prev, next = node.next;
              if (prev !== null) {
                prev.next = next;
              } else {
                list.head = next;
              }
              if (next !== null) {
                next.prev = prev;
              } else {
                list.tail = prev;
              }
              node.prev = node.next = null;
              list.length--;
              return node;
            };
            var LinkedList = function() {
              function LinkedList2(vals) {
                var _this = this;
                _classCallCheck(this, LinkedList2);
                this.length = 0;
                this.head = null;
                this.tail = null;
                if (vals != null) {
                  vals.forEach(function(v) {
                    return _this.push(v);
                  });
                }
              }
              _createClass(LinkedList2, [{
                key: "size",
                value: function size() {
                  return this.length;
                }
              }, {
                key: "insertBefore",
                value: function insertBefore(val, otherNode) {
                  return add(otherNode.prev, nodeFrom(val), otherNode, this);
                }
              }, {
                key: "insertAfter",
                value: function insertAfter(val, otherNode) {
                  return add(otherNode, nodeFrom(val), otherNode.next, this);
                }
              }, {
                key: "insertNodeBefore",
                value: function insertNodeBefore(newNode, otherNode) {
                  return add(otherNode.prev, newNode, otherNode, this);
                }
              }, {
                key: "insertNodeAfter",
                value: function insertNodeAfter(newNode, otherNode) {
                  return add(otherNode, newNode, otherNode.next, this);
                }
              }, {
                key: "push",
                value: function push(val) {
                  return add(this.tail, nodeFrom(val), null, this);
                }
              }, {
                key: "unshift",
                value: function unshift(val) {
                  return add(null, nodeFrom(val), this.head, this);
                }
              }, {
                key: "remove",
                value: function remove(node) {
                  return _remove(node, this);
                }
              }, {
                key: "pop",
                value: function pop() {
                  return _remove(this.tail, this).value;
                }
              }, {
                key: "popNode",
                value: function popNode() {
                  return _remove(this.tail, this);
                }
              }, {
                key: "shift",
                value: function shift() {
                  return _remove(this.head, this).value;
                }
              }, {
                key: "shiftNode",
                value: function shiftNode() {
                  return _remove(this.head, this);
                }
              }, {
                key: "get_object_at",
                value: function get_object_at(index) {
                  if (index <= this.length()) {
                    var i = 1;
                    var current = this.head;
                    while (i < index) {
                      current = current.next;
                      i++;
                    }
                    return current.value;
                  }
                }
              }, {
                key: "set_object_at",
                value: function set_object_at(index, value) {
                  if (index <= this.length()) {
                    var i = 1;
                    var current = this.head;
                    while (i < index) {
                      current = current.next;
                      i++;
                    }
                    current.value = value;
                  }
                }
              }]);
              return LinkedList2;
            }();
            module2.exports = LinkedList;
          },
          /* 12 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function Point2(x, y, p) {
              this.x = null;
              this.y = null;
              if (x == null && y == null && p == null) {
                this.x = 0;
                this.y = 0;
              } else if (typeof x == "number" && typeof y == "number" && p == null) {
                this.x = x;
                this.y = y;
              } else if (x.constructor.name == "Point" && y == null && p == null) {
                p = x;
                this.x = p.x;
                this.y = p.y;
              }
            }
            Point2.prototype.getX = function() {
              return this.x;
            };
            Point2.prototype.getY = function() {
              return this.y;
            };
            Point2.prototype.getLocation = function() {
              return new Point2(this.x, this.y);
            };
            Point2.prototype.setLocation = function(x, y, p) {
              if (x.constructor.name == "Point" && y == null && p == null) {
                p = x;
                this.setLocation(p.x, p.y);
              } else if (typeof x == "number" && typeof y == "number" && p == null) {
                if (parseInt(x) == x && parseInt(y) == y) {
                  this.move(x, y);
                } else {
                  this.x = Math.floor(x + 0.5);
                  this.y = Math.floor(y + 0.5);
                }
              }
            };
            Point2.prototype.move = function(x, y) {
              this.x = x;
              this.y = y;
            };
            Point2.prototype.translate = function(dx, dy) {
              this.x += dx;
              this.y += dy;
            };
            Point2.prototype.equals = function(obj) {
              if (obj.constructor.name == "Point") {
                var pt = obj;
                return this.x == pt.x && this.y == pt.y;
              }
              return this == obj;
            };
            Point2.prototype.toString = function() {
              return new Point2().constructor.name + "[x=" + this.x + ",y=" + this.y + "]";
            };
            module2.exports = Point2;
          },
          /* 13 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function RectangleD(x, y, width, height) {
              this.x = 0;
              this.y = 0;
              this.width = 0;
              this.height = 0;
              if (x != null && y != null && width != null && height != null) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
              }
            }
            RectangleD.prototype.getX = function() {
              return this.x;
            };
            RectangleD.prototype.setX = function(x) {
              this.x = x;
            };
            RectangleD.prototype.getY = function() {
              return this.y;
            };
            RectangleD.prototype.setY = function(y) {
              this.y = y;
            };
            RectangleD.prototype.getWidth = function() {
              return this.width;
            };
            RectangleD.prototype.setWidth = function(width) {
              this.width = width;
            };
            RectangleD.prototype.getHeight = function() {
              return this.height;
            };
            RectangleD.prototype.setHeight = function(height) {
              this.height = height;
            };
            RectangleD.prototype.getRight = function() {
              return this.x + this.width;
            };
            RectangleD.prototype.getBottom = function() {
              return this.y + this.height;
            };
            RectangleD.prototype.intersects = function(a) {
              if (this.getRight() < a.x) {
                return false;
              }
              if (this.getBottom() < a.y) {
                return false;
              }
              if (a.getRight() < this.x) {
                return false;
              }
              if (a.getBottom() < this.y) {
                return false;
              }
              return true;
            };
            RectangleD.prototype.getCenterX = function() {
              return this.x + this.width / 2;
            };
            RectangleD.prototype.getMinX = function() {
              return this.getX();
            };
            RectangleD.prototype.getMaxX = function() {
              return this.getX() + this.width;
            };
            RectangleD.prototype.getCenterY = function() {
              return this.y + this.height / 2;
            };
            RectangleD.prototype.getMinY = function() {
              return this.getY();
            };
            RectangleD.prototype.getMaxY = function() {
              return this.getY() + this.height;
            };
            RectangleD.prototype.getWidthHalf = function() {
              return this.width / 2;
            };
            RectangleD.prototype.getHeightHalf = function() {
              return this.height / 2;
            };
            module2.exports = RectangleD;
          },
          /* 14 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
              return typeof obj;
            } : function(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function UniqueIDGeneretor() {
            }
            UniqueIDGeneretor.lastID = 0;
            UniqueIDGeneretor.createID = function(obj) {
              if (UniqueIDGeneretor.isPrimitive(obj)) {
                return obj;
              }
              if (obj.uniqueID != null) {
                return obj.uniqueID;
              }
              obj.uniqueID = UniqueIDGeneretor.getString();
              UniqueIDGeneretor.lastID++;
              return obj.uniqueID;
            };
            UniqueIDGeneretor.getString = function(id) {
              if (id == null)
                id = UniqueIDGeneretor.lastID;
              return "Object#" + id;
            };
            UniqueIDGeneretor.isPrimitive = function(arg) {
              var type = typeof arg === "undefined" ? "undefined" : _typeof(arg);
              return arg == null || type != "object" && type != "function";
            };
            module2.exports = UniqueIDGeneretor;
          },
          /* 15 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function _toConsumableArray(arr) {
              if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                  arr2[i] = arr[i];
                }
                return arr2;
              } else {
                return Array.from(arr);
              }
            }
            var LayoutConstants = __webpack_require__(0);
            var LGraphManager = __webpack_require__(6);
            var LNode = __webpack_require__(3);
            var LEdge = __webpack_require__(1);
            var LGraph = __webpack_require__(5);
            var PointD = __webpack_require__(4);
            var Transform = __webpack_require__(17);
            var Emitter = __webpack_require__(27);
            function Layout2(isRemoteUse) {
              Emitter.call(this);
              this.layoutQuality = LayoutConstants.QUALITY;
              this.createBendsAsNeeded = LayoutConstants.DEFAULT_CREATE_BENDS_AS_NEEDED;
              this.incremental = LayoutConstants.DEFAULT_INCREMENTAL;
              this.animationOnLayout = LayoutConstants.DEFAULT_ANIMATION_ON_LAYOUT;
              this.animationDuringLayout = LayoutConstants.DEFAULT_ANIMATION_DURING_LAYOUT;
              this.animationPeriod = LayoutConstants.DEFAULT_ANIMATION_PERIOD;
              this.uniformLeafNodeSizes = LayoutConstants.DEFAULT_UNIFORM_LEAF_NODE_SIZES;
              this.edgeToDummyNodes = /* @__PURE__ */ new Map();
              this.graphManager = new LGraphManager(this);
              this.isLayoutFinished = false;
              this.isSubLayout = false;
              this.isRemoteUse = false;
              if (isRemoteUse != null) {
                this.isRemoteUse = isRemoteUse;
              }
            }
            Layout2.RANDOM_SEED = 1;
            Layout2.prototype = Object.create(Emitter.prototype);
            Layout2.prototype.getGraphManager = function() {
              return this.graphManager;
            };
            Layout2.prototype.getAllNodes = function() {
              return this.graphManager.getAllNodes();
            };
            Layout2.prototype.getAllEdges = function() {
              return this.graphManager.getAllEdges();
            };
            Layout2.prototype.getAllNodesToApplyGravitation = function() {
              return this.graphManager.getAllNodesToApplyGravitation();
            };
            Layout2.prototype.newGraphManager = function() {
              var gm = new LGraphManager(this);
              this.graphManager = gm;
              return gm;
            };
            Layout2.prototype.newGraph = function(vGraph) {
              return new LGraph(null, this.graphManager, vGraph);
            };
            Layout2.prototype.newNode = function(vNode) {
              return new LNode(this.graphManager, vNode);
            };
            Layout2.prototype.newEdge = function(vEdge) {
              return new LEdge(null, null, vEdge);
            };
            Layout2.prototype.checkLayoutSuccess = function() {
              return this.graphManager.getRoot() == null || this.graphManager.getRoot().getNodes().length == 0 || this.graphManager.includesInvalidEdge();
            };
            Layout2.prototype.runLayout = function() {
              this.isLayoutFinished = false;
              if (this.tilingPreLayout) {
                this.tilingPreLayout();
              }
              this.initParameters();
              var isLayoutSuccessfull;
              if (this.checkLayoutSuccess()) {
                isLayoutSuccessfull = false;
              } else {
                isLayoutSuccessfull = this.layout();
              }
              if (LayoutConstants.ANIMATE === "during") {
                return false;
              }
              if (isLayoutSuccessfull) {
                if (!this.isSubLayout) {
                  this.doPostLayout();
                }
              }
              if (this.tilingPostLayout) {
                this.tilingPostLayout();
              }
              this.isLayoutFinished = true;
              return isLayoutSuccessfull;
            };
            Layout2.prototype.doPostLayout = function() {
              if (!this.incremental) {
                this.transform();
              }
              this.update();
            };
            Layout2.prototype.update2 = function() {
              if (this.createBendsAsNeeded) {
                this.createBendpointsFromDummyNodes();
                this.graphManager.resetAllEdges();
              }
              if (!this.isRemoteUse) {
                var allEdges = this.graphManager.getAllEdges();
                for (var i = 0; i < allEdges.length; i++) {
                  allEdges[i];
                }
                var nodes = this.graphManager.getRoot().getNodes();
                for (var i = 0; i < nodes.length; i++) {
                  nodes[i];
                }
                this.update(this.graphManager.getRoot());
              }
            };
            Layout2.prototype.update = function(obj) {
              if (obj == null) {
                this.update2();
              } else if (obj instanceof LNode) {
                var node = obj;
                if (node.getChild() != null) {
                  var nodes = node.getChild().getNodes();
                  for (var i = 0; i < nodes.length; i++) {
                    update(nodes[i]);
                  }
                }
                if (node.vGraphObject != null) {
                  var vNode = node.vGraphObject;
                  vNode.update(node);
                }
              } else if (obj instanceof LEdge) {
                var edge = obj;
                if (edge.vGraphObject != null) {
                  var vEdge = edge.vGraphObject;
                  vEdge.update(edge);
                }
              } else if (obj instanceof LGraph) {
                var graph = obj;
                if (graph.vGraphObject != null) {
                  var vGraph = graph.vGraphObject;
                  vGraph.update(graph);
                }
              }
            };
            Layout2.prototype.initParameters = function() {
              if (!this.isSubLayout) {
                this.layoutQuality = LayoutConstants.QUALITY;
                this.animationDuringLayout = LayoutConstants.DEFAULT_ANIMATION_DURING_LAYOUT;
                this.animationPeriod = LayoutConstants.DEFAULT_ANIMATION_PERIOD;
                this.animationOnLayout = LayoutConstants.DEFAULT_ANIMATION_ON_LAYOUT;
                this.incremental = LayoutConstants.DEFAULT_INCREMENTAL;
                this.createBendsAsNeeded = LayoutConstants.DEFAULT_CREATE_BENDS_AS_NEEDED;
                this.uniformLeafNodeSizes = LayoutConstants.DEFAULT_UNIFORM_LEAF_NODE_SIZES;
              }
              if (this.animationDuringLayout) {
                this.animationOnLayout = false;
              }
            };
            Layout2.prototype.transform = function(newLeftTop) {
              if (newLeftTop == void 0) {
                this.transform(new PointD(0, 0));
              } else {
                var trans = new Transform();
                var leftTop = this.graphManager.getRoot().updateLeftTop();
                if (leftTop != null) {
                  trans.setWorldOrgX(newLeftTop.x);
                  trans.setWorldOrgY(newLeftTop.y);
                  trans.setDeviceOrgX(leftTop.x);
                  trans.setDeviceOrgY(leftTop.y);
                  var nodes = this.getAllNodes();
                  var node;
                  for (var i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    node.transform(trans);
                  }
                }
              }
            };
            Layout2.prototype.positionNodesRandomly = function(graph) {
              if (graph == void 0) {
                this.positionNodesRandomly(this.getGraphManager().getRoot());
                this.getGraphManager().getRoot().updateBounds(true);
              } else {
                var lNode;
                var childGraph;
                var nodes = graph.getNodes();
                for (var i = 0; i < nodes.length; i++) {
                  lNode = nodes[i];
                  childGraph = lNode.getChild();
                  if (childGraph == null) {
                    lNode.scatter();
                  } else if (childGraph.getNodes().length == 0) {
                    lNode.scatter();
                  } else {
                    this.positionNodesRandomly(childGraph);
                    lNode.updateBounds();
                  }
                }
              }
            };
            Layout2.prototype.getFlatForest = function() {
              var flatForest = [];
              var isForest = true;
              var allNodes = this.graphManager.getRoot().getNodes();
              var isFlat = true;
              for (var i = 0; i < allNodes.length; i++) {
                if (allNodes[i].getChild() != null) {
                  isFlat = false;
                }
              }
              if (!isFlat) {
                return flatForest;
              }
              var visited = /* @__PURE__ */ new Set();
              var toBeVisited = [];
              var parents = /* @__PURE__ */ new Map();
              var unProcessedNodes = [];
              unProcessedNodes = unProcessedNodes.concat(allNodes);
              while (unProcessedNodes.length > 0 && isForest) {
                toBeVisited.push(unProcessedNodes[0]);
                while (toBeVisited.length > 0 && isForest) {
                  var currentNode = toBeVisited[0];
                  toBeVisited.splice(0, 1);
                  visited.add(currentNode);
                  var neighborEdges = currentNode.getEdges();
                  for (var i = 0; i < neighborEdges.length; i++) {
                    var currentNeighbor = neighborEdges[i].getOtherEnd(currentNode);
                    if (parents.get(currentNode) != currentNeighbor) {
                      if (!visited.has(currentNeighbor)) {
                        toBeVisited.push(currentNeighbor);
                        parents.set(currentNeighbor, currentNode);
                      } else {
                        isForest = false;
                        break;
                      }
                    }
                  }
                }
                if (!isForest) {
                  flatForest = [];
                } else {
                  var temp = [].concat(_toConsumableArray(visited));
                  flatForest.push(temp);
                  for (var i = 0; i < temp.length; i++) {
                    var value = temp[i];
                    var index = unProcessedNodes.indexOf(value);
                    if (index > -1) {
                      unProcessedNodes.splice(index, 1);
                    }
                  }
                  visited = /* @__PURE__ */ new Set();
                  parents = /* @__PURE__ */ new Map();
                }
              }
              return flatForest;
            };
            Layout2.prototype.createDummyNodesForBendpoints = function(edge) {
              var dummyNodes = [];
              var prev = edge.source;
              var graph = this.graphManager.calcLowestCommonAncestor(edge.source, edge.target);
              for (var i = 0; i < edge.bendpoints.length; i++) {
                var dummyNode = this.newNode(null);
                dummyNode.setRect(new Point(0, 0), new Dimension(1, 1));
                graph.add(dummyNode);
                var dummyEdge = this.newEdge(null);
                this.graphManager.add(dummyEdge, prev, dummyNode);
                dummyNodes.add(dummyNode);
                prev = dummyNode;
              }
              var dummyEdge = this.newEdge(null);
              this.graphManager.add(dummyEdge, prev, edge.target);
              this.edgeToDummyNodes.set(edge, dummyNodes);
              if (edge.isInterGraph()) {
                this.graphManager.remove(edge);
              } else {
                graph.remove(edge);
              }
              return dummyNodes;
            };
            Layout2.prototype.createBendpointsFromDummyNodes = function() {
              var edges = [];
              edges = edges.concat(this.graphManager.getAllEdges());
              edges = [].concat(_toConsumableArray(this.edgeToDummyNodes.keys())).concat(edges);
              for (var k = 0; k < edges.length; k++) {
                var lEdge = edges[k];
                if (lEdge.bendpoints.length > 0) {
                  var path = this.edgeToDummyNodes.get(lEdge);
                  for (var i = 0; i < path.length; i++) {
                    var dummyNode = path[i];
                    var p = new PointD(dummyNode.getCenterX(), dummyNode.getCenterY());
                    var ebp = lEdge.bendpoints.get(i);
                    ebp.x = p.x;
                    ebp.y = p.y;
                    dummyNode.getOwner().remove(dummyNode);
                  }
                  this.graphManager.add(lEdge, lEdge.source, lEdge.target);
                }
              }
            };
            Layout2.transform = function(sliderValue, defaultValue, minDiv, maxMul) {
              if (minDiv != void 0 && maxMul != void 0) {
                var value = defaultValue;
                if (sliderValue <= 50) {
                  var minValue = defaultValue / minDiv;
                  value -= (defaultValue - minValue) / 50 * (50 - sliderValue);
                } else {
                  var maxValue = defaultValue * maxMul;
                  value += (maxValue - defaultValue) / 50 * (sliderValue - 50);
                }
                return value;
              } else {
                var a, b;
                if (sliderValue <= 50) {
                  a = 9 * defaultValue / 500;
                  b = defaultValue / 10;
                } else {
                  a = 9 * defaultValue / 50;
                  b = -8 * defaultValue;
                }
                return a * sliderValue + b;
              }
            };
            Layout2.findCenterOfTree = function(nodes) {
              var list = [];
              list = list.concat(nodes);
              var removedNodes = [];
              var remainingDegrees = /* @__PURE__ */ new Map();
              var foundCenter = false;
              var centerNode = null;
              if (list.length == 1 || list.length == 2) {
                foundCenter = true;
                centerNode = list[0];
              }
              for (var i = 0; i < list.length; i++) {
                var node = list[i];
                var degree = node.getNeighborsList().size;
                remainingDegrees.set(node, node.getNeighborsList().size);
                if (degree == 1) {
                  removedNodes.push(node);
                }
              }
              var tempList = [];
              tempList = tempList.concat(removedNodes);
              while (!foundCenter) {
                var tempList2 = [];
                tempList2 = tempList2.concat(tempList);
                tempList = [];
                for (var i = 0; i < list.length; i++) {
                  var node = list[i];
                  var index = list.indexOf(node);
                  if (index >= 0) {
                    list.splice(index, 1);
                  }
                  var neighbours = node.getNeighborsList();
                  neighbours.forEach(function(neighbour) {
                    if (removedNodes.indexOf(neighbour) < 0) {
                      var otherDegree = remainingDegrees.get(neighbour);
                      var newDegree = otherDegree - 1;
                      if (newDegree == 1) {
                        tempList.push(neighbour);
                      }
                      remainingDegrees.set(neighbour, newDegree);
                    }
                  });
                }
                removedNodes = removedNodes.concat(tempList);
                if (list.length == 1 || list.length == 2) {
                  foundCenter = true;
                  centerNode = list[0];
                }
              }
              return centerNode;
            };
            Layout2.prototype.setGraphManager = function(gm) {
              this.graphManager = gm;
            };
            module2.exports = Layout2;
          },
          /* 16 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function RandomSeed() {
            }
            RandomSeed.seed = 1;
            RandomSeed.x = 0;
            RandomSeed.nextDouble = function() {
              RandomSeed.x = Math.sin(RandomSeed.seed++) * 1e4;
              return RandomSeed.x - Math.floor(RandomSeed.x);
            };
            module2.exports = RandomSeed;
          },
          /* 17 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var PointD = __webpack_require__(4);
            function Transform(x, y) {
              this.lworldOrgX = 0;
              this.lworldOrgY = 0;
              this.ldeviceOrgX = 0;
              this.ldeviceOrgY = 0;
              this.lworldExtX = 1;
              this.lworldExtY = 1;
              this.ldeviceExtX = 1;
              this.ldeviceExtY = 1;
            }
            Transform.prototype.getWorldOrgX = function() {
              return this.lworldOrgX;
            };
            Transform.prototype.setWorldOrgX = function(wox) {
              this.lworldOrgX = wox;
            };
            Transform.prototype.getWorldOrgY = function() {
              return this.lworldOrgY;
            };
            Transform.prototype.setWorldOrgY = function(woy) {
              this.lworldOrgY = woy;
            };
            Transform.prototype.getWorldExtX = function() {
              return this.lworldExtX;
            };
            Transform.prototype.setWorldExtX = function(wex) {
              this.lworldExtX = wex;
            };
            Transform.prototype.getWorldExtY = function() {
              return this.lworldExtY;
            };
            Transform.prototype.setWorldExtY = function(wey) {
              this.lworldExtY = wey;
            };
            Transform.prototype.getDeviceOrgX = function() {
              return this.ldeviceOrgX;
            };
            Transform.prototype.setDeviceOrgX = function(dox) {
              this.ldeviceOrgX = dox;
            };
            Transform.prototype.getDeviceOrgY = function() {
              return this.ldeviceOrgY;
            };
            Transform.prototype.setDeviceOrgY = function(doy) {
              this.ldeviceOrgY = doy;
            };
            Transform.prototype.getDeviceExtX = function() {
              return this.ldeviceExtX;
            };
            Transform.prototype.setDeviceExtX = function(dex) {
              this.ldeviceExtX = dex;
            };
            Transform.prototype.getDeviceExtY = function() {
              return this.ldeviceExtY;
            };
            Transform.prototype.setDeviceExtY = function(dey) {
              this.ldeviceExtY = dey;
            };
            Transform.prototype.transformX = function(x) {
              var xDevice = 0;
              var worldExtX = this.lworldExtX;
              if (worldExtX != 0) {
                xDevice = this.ldeviceOrgX + (x - this.lworldOrgX) * this.ldeviceExtX / worldExtX;
              }
              return xDevice;
            };
            Transform.prototype.transformY = function(y) {
              var yDevice = 0;
              var worldExtY = this.lworldExtY;
              if (worldExtY != 0) {
                yDevice = this.ldeviceOrgY + (y - this.lworldOrgY) * this.ldeviceExtY / worldExtY;
              }
              return yDevice;
            };
            Transform.prototype.inverseTransformX = function(x) {
              var xWorld = 0;
              var deviceExtX = this.ldeviceExtX;
              if (deviceExtX != 0) {
                xWorld = this.lworldOrgX + (x - this.ldeviceOrgX) * this.lworldExtX / deviceExtX;
              }
              return xWorld;
            };
            Transform.prototype.inverseTransformY = function(y) {
              var yWorld = 0;
              var deviceExtY = this.ldeviceExtY;
              if (deviceExtY != 0) {
                yWorld = this.lworldOrgY + (y - this.ldeviceOrgY) * this.lworldExtY / deviceExtY;
              }
              return yWorld;
            };
            Transform.prototype.inverseTransformPoint = function(inPoint) {
              var outPoint = new PointD(this.inverseTransformX(inPoint.x), this.inverseTransformY(inPoint.y));
              return outPoint;
            };
            module2.exports = Transform;
          },
          /* 18 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function _toConsumableArray(arr) {
              if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                  arr2[i] = arr[i];
                }
                return arr2;
              } else {
                return Array.from(arr);
              }
            }
            var Layout2 = __webpack_require__(15);
            var FDLayoutConstants = __webpack_require__(7);
            var LayoutConstants = __webpack_require__(0);
            var IGeometry = __webpack_require__(8);
            var IMath = __webpack_require__(9);
            function FDLayout() {
              Layout2.call(this);
              this.useSmartIdealEdgeLengthCalculation = FDLayoutConstants.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION;
              this.idealEdgeLength = FDLayoutConstants.DEFAULT_EDGE_LENGTH;
              this.springConstant = FDLayoutConstants.DEFAULT_SPRING_STRENGTH;
              this.repulsionConstant = FDLayoutConstants.DEFAULT_REPULSION_STRENGTH;
              this.gravityConstant = FDLayoutConstants.DEFAULT_GRAVITY_STRENGTH;
              this.compoundGravityConstant = FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH;
              this.gravityRangeFactor = FDLayoutConstants.DEFAULT_GRAVITY_RANGE_FACTOR;
              this.compoundGravityRangeFactor = FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR;
              this.displacementThresholdPerNode = 3 * FDLayoutConstants.DEFAULT_EDGE_LENGTH / 100;
              this.coolingFactor = FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL;
              this.initialCoolingFactor = FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL;
              this.totalDisplacement = 0;
              this.oldTotalDisplacement = 0;
              this.maxIterations = FDLayoutConstants.MAX_ITERATIONS;
            }
            FDLayout.prototype = Object.create(Layout2.prototype);
            for (var prop in Layout2) {
              FDLayout[prop] = Layout2[prop];
            }
            FDLayout.prototype.initParameters = function() {
              Layout2.prototype.initParameters.call(this, arguments);
              this.totalIterations = 0;
              this.notAnimatedIterations = 0;
              this.useFRGridVariant = FDLayoutConstants.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION;
              this.grid = [];
            };
            FDLayout.prototype.calcIdealEdgeLengths = function() {
              var edge;
              var lcaDepth;
              var source;
              var target;
              var sizeOfSourceInLca;
              var sizeOfTargetInLca;
              var allEdges = this.getGraphManager().getAllEdges();
              for (var i = 0; i < allEdges.length; i++) {
                edge = allEdges[i];
                edge.idealLength = this.idealEdgeLength;
                if (edge.isInterGraph) {
                  source = edge.getSource();
                  target = edge.getTarget();
                  sizeOfSourceInLca = edge.getSourceInLca().getEstimatedSize();
                  sizeOfTargetInLca = edge.getTargetInLca().getEstimatedSize();
                  if (this.useSmartIdealEdgeLengthCalculation) {
                    edge.idealLength += sizeOfSourceInLca + sizeOfTargetInLca - 2 * LayoutConstants.SIMPLE_NODE_SIZE;
                  }
                  lcaDepth = edge.getLca().getInclusionTreeDepth();
                  edge.idealLength += FDLayoutConstants.DEFAULT_EDGE_LENGTH * FDLayoutConstants.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR * (source.getInclusionTreeDepth() + target.getInclusionTreeDepth() - 2 * lcaDepth);
                }
              }
            };
            FDLayout.prototype.initSpringEmbedder = function() {
              var s = this.getAllNodes().length;
              if (this.incremental) {
                if (s > FDLayoutConstants.ADAPTATION_LOWER_NODE_LIMIT) {
                  this.coolingFactor = Math.max(this.coolingFactor * FDLayoutConstants.COOLING_ADAPTATION_FACTOR, this.coolingFactor - (s - FDLayoutConstants.ADAPTATION_LOWER_NODE_LIMIT) / (FDLayoutConstants.ADAPTATION_UPPER_NODE_LIMIT - FDLayoutConstants.ADAPTATION_LOWER_NODE_LIMIT) * this.coolingFactor * (1 - FDLayoutConstants.COOLING_ADAPTATION_FACTOR));
                }
                this.maxNodeDisplacement = FDLayoutConstants.MAX_NODE_DISPLACEMENT_INCREMENTAL;
              } else {
                if (s > FDLayoutConstants.ADAPTATION_LOWER_NODE_LIMIT) {
                  this.coolingFactor = Math.max(FDLayoutConstants.COOLING_ADAPTATION_FACTOR, 1 - (s - FDLayoutConstants.ADAPTATION_LOWER_NODE_LIMIT) / (FDLayoutConstants.ADAPTATION_UPPER_NODE_LIMIT - FDLayoutConstants.ADAPTATION_LOWER_NODE_LIMIT) * (1 - FDLayoutConstants.COOLING_ADAPTATION_FACTOR));
                } else {
                  this.coolingFactor = 1;
                }
                this.initialCoolingFactor = this.coolingFactor;
                this.maxNodeDisplacement = FDLayoutConstants.MAX_NODE_DISPLACEMENT;
              }
              this.maxIterations = Math.max(this.getAllNodes().length * 5, this.maxIterations);
              this.totalDisplacementThreshold = this.displacementThresholdPerNode * this.getAllNodes().length;
              this.repulsionRange = this.calcRepulsionRange();
            };
            FDLayout.prototype.calcSpringForces = function() {
              var lEdges = this.getAllEdges();
              var edge;
              for (var i = 0; i < lEdges.length; i++) {
                edge = lEdges[i];
                this.calcSpringForce(edge, edge.idealLength);
              }
            };
            FDLayout.prototype.calcRepulsionForces = function() {
              var gridUpdateAllowed = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
              var forceToNodeSurroundingUpdate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
              var i, j;
              var nodeA, nodeB;
              var lNodes = this.getAllNodes();
              var processedNodeSet;
              if (this.useFRGridVariant) {
                if (this.totalIterations % FDLayoutConstants.GRID_CALCULATION_CHECK_PERIOD == 1 && gridUpdateAllowed) {
                  this.updateGrid();
                }
                processedNodeSet = /* @__PURE__ */ new Set();
                for (i = 0; i < lNodes.length; i++) {
                  nodeA = lNodes[i];
                  this.calculateRepulsionForceOfANode(nodeA, processedNodeSet, gridUpdateAllowed, forceToNodeSurroundingUpdate);
                  processedNodeSet.add(nodeA);
                }
              } else {
                for (i = 0; i < lNodes.length; i++) {
                  nodeA = lNodes[i];
                  for (j = i + 1; j < lNodes.length; j++) {
                    nodeB = lNodes[j];
                    if (nodeA.getOwner() != nodeB.getOwner()) {
                      continue;
                    }
                    this.calcRepulsionForce(nodeA, nodeB);
                  }
                }
              }
            };
            FDLayout.prototype.calcGravitationalForces = function() {
              var node;
              var lNodes = this.getAllNodesToApplyGravitation();
              for (var i = 0; i < lNodes.length; i++) {
                node = lNodes[i];
                this.calcGravitationalForce(node);
              }
            };
            FDLayout.prototype.moveNodes = function() {
              var lNodes = this.getAllNodes();
              var node;
              for (var i = 0; i < lNodes.length; i++) {
                node = lNodes[i];
                node.move();
              }
            };
            FDLayout.prototype.calcSpringForce = function(edge, idealLength) {
              var sourceNode = edge.getSource();
              var targetNode = edge.getTarget();
              var length;
              var springForce;
              var springForceX;
              var springForceY;
              if (this.uniformLeafNodeSizes && sourceNode.getChild() == null && targetNode.getChild() == null) {
                edge.updateLengthSimple();
              } else {
                edge.updateLength();
                if (edge.isOverlapingSourceAndTarget) {
                  return;
                }
              }
              length = edge.getLength();
              if (length == 0)
                return;
              springForce = this.springConstant * (length - idealLength);
              springForceX = springForce * (edge.lengthX / length);
              springForceY = springForce * (edge.lengthY / length);
              sourceNode.springForceX += springForceX;
              sourceNode.springForceY += springForceY;
              targetNode.springForceX -= springForceX;
              targetNode.springForceY -= springForceY;
            };
            FDLayout.prototype.calcRepulsionForce = function(nodeA, nodeB) {
              var rectA = nodeA.getRect();
              var rectB = nodeB.getRect();
              var overlapAmount = new Array(2);
              var clipPoints = new Array(4);
              var distanceX;
              var distanceY;
              var distanceSquared;
              var distance;
              var repulsionForce;
              var repulsionForceX;
              var repulsionForceY;
              if (rectA.intersects(rectB)) {
                IGeometry.calcSeparationAmount(rectA, rectB, overlapAmount, FDLayoutConstants.DEFAULT_EDGE_LENGTH / 2);
                repulsionForceX = 2 * overlapAmount[0];
                repulsionForceY = 2 * overlapAmount[1];
                var childrenConstant = nodeA.noOfChildren * nodeB.noOfChildren / (nodeA.noOfChildren + nodeB.noOfChildren);
                nodeA.repulsionForceX -= childrenConstant * repulsionForceX;
                nodeA.repulsionForceY -= childrenConstant * repulsionForceY;
                nodeB.repulsionForceX += childrenConstant * repulsionForceX;
                nodeB.repulsionForceY += childrenConstant * repulsionForceY;
              } else {
                if (this.uniformLeafNodeSizes && nodeA.getChild() == null && nodeB.getChild() == null) {
                  distanceX = rectB.getCenterX() - rectA.getCenterX();
                  distanceY = rectB.getCenterY() - rectA.getCenterY();
                } else {
                  IGeometry.getIntersection(rectA, rectB, clipPoints);
                  distanceX = clipPoints[2] - clipPoints[0];
                  distanceY = clipPoints[3] - clipPoints[1];
                }
                if (Math.abs(distanceX) < FDLayoutConstants.MIN_REPULSION_DIST) {
                  distanceX = IMath.sign(distanceX) * FDLayoutConstants.MIN_REPULSION_DIST;
                }
                if (Math.abs(distanceY) < FDLayoutConstants.MIN_REPULSION_DIST) {
                  distanceY = IMath.sign(distanceY) * FDLayoutConstants.MIN_REPULSION_DIST;
                }
                distanceSquared = distanceX * distanceX + distanceY * distanceY;
                distance = Math.sqrt(distanceSquared);
                repulsionForce = this.repulsionConstant * nodeA.noOfChildren * nodeB.noOfChildren / distanceSquared;
                repulsionForceX = repulsionForce * distanceX / distance;
                repulsionForceY = repulsionForce * distanceY / distance;
                nodeA.repulsionForceX -= repulsionForceX;
                nodeA.repulsionForceY -= repulsionForceY;
                nodeB.repulsionForceX += repulsionForceX;
                nodeB.repulsionForceY += repulsionForceY;
              }
            };
            FDLayout.prototype.calcGravitationalForce = function(node) {
              var ownerGraph;
              var ownerCenterX;
              var ownerCenterY;
              var distanceX;
              var distanceY;
              var absDistanceX;
              var absDistanceY;
              var estimatedSize;
              ownerGraph = node.getOwner();
              ownerCenterX = (ownerGraph.getRight() + ownerGraph.getLeft()) / 2;
              ownerCenterY = (ownerGraph.getTop() + ownerGraph.getBottom()) / 2;
              distanceX = node.getCenterX() - ownerCenterX;
              distanceY = node.getCenterY() - ownerCenterY;
              absDistanceX = Math.abs(distanceX) + node.getWidth() / 2;
              absDistanceY = Math.abs(distanceY) + node.getHeight() / 2;
              if (node.getOwner() == this.graphManager.getRoot()) {
                estimatedSize = ownerGraph.getEstimatedSize() * this.gravityRangeFactor;
                if (absDistanceX > estimatedSize || absDistanceY > estimatedSize) {
                  node.gravitationForceX = -this.gravityConstant * distanceX;
                  node.gravitationForceY = -this.gravityConstant * distanceY;
                }
              } else {
                estimatedSize = ownerGraph.getEstimatedSize() * this.compoundGravityRangeFactor;
                if (absDistanceX > estimatedSize || absDistanceY > estimatedSize) {
                  node.gravitationForceX = -this.gravityConstant * distanceX * this.compoundGravityConstant;
                  node.gravitationForceY = -this.gravityConstant * distanceY * this.compoundGravityConstant;
                }
              }
            };
            FDLayout.prototype.isConverged = function() {
              var converged;
              var oscilating = false;
              if (this.totalIterations > this.maxIterations / 3) {
                oscilating = Math.abs(this.totalDisplacement - this.oldTotalDisplacement) < 2;
              }
              converged = this.totalDisplacement < this.totalDisplacementThreshold;
              this.oldTotalDisplacement = this.totalDisplacement;
              return converged || oscilating;
            };
            FDLayout.prototype.animate = function() {
              if (this.animationDuringLayout && !this.isSubLayout) {
                if (this.notAnimatedIterations == this.animationPeriod) {
                  this.update();
                  this.notAnimatedIterations = 0;
                } else {
                  this.notAnimatedIterations++;
                }
              }
            };
            FDLayout.prototype.calcNoOfChildrenForAllNodes = function() {
              var node;
              var allNodes = this.graphManager.getAllNodes();
              for (var i = 0; i < allNodes.length; i++) {
                node = allNodes[i];
                node.noOfChildren = node.getNoOfChildren();
              }
            };
            FDLayout.prototype.calcGrid = function(graph) {
              var sizeX = 0;
              var sizeY = 0;
              sizeX = parseInt(Math.ceil((graph.getRight() - graph.getLeft()) / this.repulsionRange));
              sizeY = parseInt(Math.ceil((graph.getBottom() - graph.getTop()) / this.repulsionRange));
              var grid = new Array(sizeX);
              for (var i = 0; i < sizeX; i++) {
                grid[i] = new Array(sizeY);
              }
              for (var i = 0; i < sizeX; i++) {
                for (var j = 0; j < sizeY; j++) {
                  grid[i][j] = new Array();
                }
              }
              return grid;
            };
            FDLayout.prototype.addNodeToGrid = function(v, left, top) {
              var startX = 0;
              var finishX = 0;
              var startY = 0;
              var finishY = 0;
              startX = parseInt(Math.floor((v.getRect().x - left) / this.repulsionRange));
              finishX = parseInt(Math.floor((v.getRect().width + v.getRect().x - left) / this.repulsionRange));
              startY = parseInt(Math.floor((v.getRect().y - top) / this.repulsionRange));
              finishY = parseInt(Math.floor((v.getRect().height + v.getRect().y - top) / this.repulsionRange));
              for (var i = startX; i <= finishX; i++) {
                for (var j = startY; j <= finishY; j++) {
                  this.grid[i][j].push(v);
                  v.setGridCoordinates(startX, finishX, startY, finishY);
                }
              }
            };
            FDLayout.prototype.updateGrid = function() {
              var i;
              var nodeA;
              var lNodes = this.getAllNodes();
              this.grid = this.calcGrid(this.graphManager.getRoot());
              for (i = 0; i < lNodes.length; i++) {
                nodeA = lNodes[i];
                this.addNodeToGrid(nodeA, this.graphManager.getRoot().getLeft(), this.graphManager.getRoot().getTop());
              }
            };
            FDLayout.prototype.calculateRepulsionForceOfANode = function(nodeA, processedNodeSet, gridUpdateAllowed, forceToNodeSurroundingUpdate) {
              if (this.totalIterations % FDLayoutConstants.GRID_CALCULATION_CHECK_PERIOD == 1 && gridUpdateAllowed || forceToNodeSurroundingUpdate) {
                var surrounding = /* @__PURE__ */ new Set();
                nodeA.surrounding = new Array();
                var nodeB;
                var grid = this.grid;
                for (var i = nodeA.startX - 1; i < nodeA.finishX + 2; i++) {
                  for (var j = nodeA.startY - 1; j < nodeA.finishY + 2; j++) {
                    if (!(i < 0 || j < 0 || i >= grid.length || j >= grid[0].length)) {
                      for (var k = 0; k < grid[i][j].length; k++) {
                        nodeB = grid[i][j][k];
                        if (nodeA.getOwner() != nodeB.getOwner() || nodeA == nodeB) {
                          continue;
                        }
                        if (!processedNodeSet.has(nodeB) && !surrounding.has(nodeB)) {
                          var distanceX = Math.abs(nodeA.getCenterX() - nodeB.getCenterX()) - (nodeA.getWidth() / 2 + nodeB.getWidth() / 2);
                          var distanceY = Math.abs(nodeA.getCenterY() - nodeB.getCenterY()) - (nodeA.getHeight() / 2 + nodeB.getHeight() / 2);
                          if (distanceX <= this.repulsionRange && distanceY <= this.repulsionRange) {
                            surrounding.add(nodeB);
                          }
                        }
                      }
                    }
                  }
                }
                nodeA.surrounding = [].concat(_toConsumableArray(surrounding));
              }
              for (i = 0; i < nodeA.surrounding.length; i++) {
                this.calcRepulsionForce(nodeA, nodeA.surrounding[i]);
              }
            };
            FDLayout.prototype.calcRepulsionRange = function() {
              return 0;
            };
            module2.exports = FDLayout;
          },
          /* 19 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var LEdge = __webpack_require__(1);
            var FDLayoutConstants = __webpack_require__(7);
            function FDLayoutEdge(source, target, vEdge) {
              LEdge.call(this, source, target, vEdge);
              this.idealLength = FDLayoutConstants.DEFAULT_EDGE_LENGTH;
            }
            FDLayoutEdge.prototype = Object.create(LEdge.prototype);
            for (var prop in LEdge) {
              FDLayoutEdge[prop] = LEdge[prop];
            }
            module2.exports = FDLayoutEdge;
          },
          /* 20 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var LNode = __webpack_require__(3);
            function FDLayoutNode(gm, loc, size, vNode) {
              LNode.call(this, gm, loc, size, vNode);
              this.springForceX = 0;
              this.springForceY = 0;
              this.repulsionForceX = 0;
              this.repulsionForceY = 0;
              this.gravitationForceX = 0;
              this.gravitationForceY = 0;
              this.displacementX = 0;
              this.displacementY = 0;
              this.startX = 0;
              this.finishX = 0;
              this.startY = 0;
              this.finishY = 0;
              this.surrounding = [];
            }
            FDLayoutNode.prototype = Object.create(LNode.prototype);
            for (var prop in LNode) {
              FDLayoutNode[prop] = LNode[prop];
            }
            FDLayoutNode.prototype.setGridCoordinates = function(_startX, _finishX, _startY, _finishY) {
              this.startX = _startX;
              this.finishX = _finishX;
              this.startY = _startY;
              this.finishY = _finishY;
            };
            module2.exports = FDLayoutNode;
          },
          /* 21 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function DimensionD2(width, height) {
              this.width = 0;
              this.height = 0;
              if (width !== null && height !== null) {
                this.height = height;
                this.width = width;
              }
            }
            DimensionD2.prototype.getWidth = function() {
              return this.width;
            };
            DimensionD2.prototype.setWidth = function(width) {
              this.width = width;
            };
            DimensionD2.prototype.getHeight = function() {
              return this.height;
            };
            DimensionD2.prototype.setHeight = function(height) {
              this.height = height;
            };
            module2.exports = DimensionD2;
          },
          /* 22 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var UniqueIDGeneretor = __webpack_require__(14);
            function HashMap() {
              this.map = {};
              this.keys = [];
            }
            HashMap.prototype.put = function(key, value) {
              var theId = UniqueIDGeneretor.createID(key);
              if (!this.contains(theId)) {
                this.map[theId] = value;
                this.keys.push(key);
              }
            };
            HashMap.prototype.contains = function(key) {
              UniqueIDGeneretor.createID(key);
              return this.map[key] != null;
            };
            HashMap.prototype.get = function(key) {
              var theId = UniqueIDGeneretor.createID(key);
              return this.map[theId];
            };
            HashMap.prototype.keySet = function() {
              return this.keys;
            };
            module2.exports = HashMap;
          },
          /* 23 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var UniqueIDGeneretor = __webpack_require__(14);
            function HashSet() {
              this.set = {};
            }
            HashSet.prototype.add = function(obj) {
              var theId = UniqueIDGeneretor.createID(obj);
              if (!this.contains(theId))
                this.set[theId] = obj;
            };
            HashSet.prototype.remove = function(obj) {
              delete this.set[UniqueIDGeneretor.createID(obj)];
            };
            HashSet.prototype.clear = function() {
              this.set = {};
            };
            HashSet.prototype.contains = function(obj) {
              return this.set[UniqueIDGeneretor.createID(obj)] == obj;
            };
            HashSet.prototype.isEmpty = function() {
              return this.size() === 0;
            };
            HashSet.prototype.size = function() {
              return Object.keys(this.set).length;
            };
            HashSet.prototype.addAllTo = function(list) {
              var keys = Object.keys(this.set);
              var length = keys.length;
              for (var i = 0; i < length; i++) {
                list.push(this.set[keys[i]]);
              }
            };
            HashSet.prototype.size = function() {
              return Object.keys(this.set).length;
            };
            HashSet.prototype.addAll = function(list) {
              var s = list.length;
              for (var i = 0; i < s; i++) {
                var v = list[i];
                this.add(v);
              }
            };
            module2.exports = HashSet;
          },
          /* 24 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var _createClass = function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            var LinkedList = __webpack_require__(11);
            var Quicksort = function() {
              function Quicksort2(A, compareFunction) {
                _classCallCheck(this, Quicksort2);
                if (compareFunction !== null || compareFunction !== void 0)
                  this.compareFunction = this._defaultCompareFunction;
                var length = void 0;
                if (A instanceof LinkedList)
                  length = A.size();
                else
                  length = A.length;
                this._quicksort(A, 0, length - 1);
              }
              _createClass(Quicksort2, [{
                key: "_quicksort",
                value: function _quicksort(A, p, r) {
                  if (p < r) {
                    var q = this._partition(A, p, r);
                    this._quicksort(A, p, q);
                    this._quicksort(A, q + 1, r);
                  }
                }
              }, {
                key: "_partition",
                value: function _partition(A, p, r) {
                  var x = this._get(A, p);
                  var i = p;
                  var j = r;
                  while (true) {
                    while (this.compareFunction(x, this._get(A, j))) {
                      j--;
                    }
                    while (this.compareFunction(this._get(A, i), x)) {
                      i++;
                    }
                    if (i < j) {
                      this._swap(A, i, j);
                      i++;
                      j--;
                    } else
                      return j;
                  }
                }
              }, {
                key: "_get",
                value: function _get(object, index) {
                  if (object instanceof LinkedList)
                    return object.get_object_at(index);
                  else
                    return object[index];
                }
              }, {
                key: "_set",
                value: function _set(object, index, value) {
                  if (object instanceof LinkedList)
                    object.set_object_at(index, value);
                  else
                    object[index] = value;
                }
              }, {
                key: "_swap",
                value: function _swap(A, i, j) {
                  var temp = this._get(A, i);
                  this._set(A, i, this._get(A, j));
                  this._set(A, j, temp);
                }
              }, {
                key: "_defaultCompareFunction",
                value: function _defaultCompareFunction(a, b) {
                  return b > a;
                }
              }]);
              return Quicksort2;
            }();
            module2.exports = Quicksort;
          },
          /* 25 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var _createClass = function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor)
                    descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }
              return function(Constructor, protoProps, staticProps) {
                if (protoProps)
                  defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                  defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            var NeedlemanWunsch = function() {
              function NeedlemanWunsch2(sequence1, sequence2) {
                var match_score = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
                var mismatch_penalty = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : -1;
                var gap_penalty = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
                _classCallCheck(this, NeedlemanWunsch2);
                this.sequence1 = sequence1;
                this.sequence2 = sequence2;
                this.match_score = match_score;
                this.mismatch_penalty = mismatch_penalty;
                this.gap_penalty = gap_penalty;
                this.iMax = sequence1.length + 1;
                this.jMax = sequence2.length + 1;
                this.grid = new Array(this.iMax);
                for (var i = 0; i < this.iMax; i++) {
                  this.grid[i] = new Array(this.jMax);
                  for (var j = 0; j < this.jMax; j++) {
                    this.grid[i][j] = 0;
                  }
                }
                this.tracebackGrid = new Array(this.iMax);
                for (var _i = 0; _i < this.iMax; _i++) {
                  this.tracebackGrid[_i] = new Array(this.jMax);
                  for (var _j = 0; _j < this.jMax; _j++) {
                    this.tracebackGrid[_i][_j] = [null, null, null];
                  }
                }
                this.alignments = [];
                this.score = -1;
                this.computeGrids();
              }
              _createClass(NeedlemanWunsch2, [{
                key: "getScore",
                value: function getScore() {
                  return this.score;
                }
              }, {
                key: "getAlignments",
                value: function getAlignments() {
                  return this.alignments;
                }
                // Main dynamic programming procedure
              }, {
                key: "computeGrids",
                value: function computeGrids() {
                  for (var j = 1; j < this.jMax; j++) {
                    this.grid[0][j] = this.grid[0][j - 1] + this.gap_penalty;
                    this.tracebackGrid[0][j] = [false, false, true];
                  }
                  for (var i = 1; i < this.iMax; i++) {
                    this.grid[i][0] = this.grid[i - 1][0] + this.gap_penalty;
                    this.tracebackGrid[i][0] = [false, true, false];
                  }
                  for (var _i2 = 1; _i2 < this.iMax; _i2++) {
                    for (var _j2 = 1; _j2 < this.jMax; _j2++) {
                      var diag = void 0;
                      if (this.sequence1[_i2 - 1] === this.sequence2[_j2 - 1])
                        diag = this.grid[_i2 - 1][_j2 - 1] + this.match_score;
                      else
                        diag = this.grid[_i2 - 1][_j2 - 1] + this.mismatch_penalty;
                      var up = this.grid[_i2 - 1][_j2] + this.gap_penalty;
                      var left = this.grid[_i2][_j2 - 1] + this.gap_penalty;
                      var maxOf = [diag, up, left];
                      var indices = this.arrayAllMaxIndexes(maxOf);
                      this.grid[_i2][_j2] = maxOf[indices[0]];
                      this.tracebackGrid[_i2][_j2] = [indices.includes(0), indices.includes(1), indices.includes(2)];
                    }
                  }
                  this.score = this.grid[this.iMax - 1][this.jMax - 1];
                }
                // Gets all possible valid sequence combinations
              }, {
                key: "alignmentTraceback",
                value: function alignmentTraceback() {
                  var inProcessAlignments = [];
                  inProcessAlignments.push({
                    pos: [this.sequence1.length, this.sequence2.length],
                    seq1: "",
                    seq2: ""
                  });
                  while (inProcessAlignments[0]) {
                    var current = inProcessAlignments[0];
                    var directions = this.tracebackGrid[current.pos[0]][current.pos[1]];
                    if (directions[0]) {
                      inProcessAlignments.push({
                        pos: [current.pos[0] - 1, current.pos[1] - 1],
                        seq1: this.sequence1[current.pos[0] - 1] + current.seq1,
                        seq2: this.sequence2[current.pos[1] - 1] + current.seq2
                      });
                    }
                    if (directions[1]) {
                      inProcessAlignments.push({
                        pos: [current.pos[0] - 1, current.pos[1]],
                        seq1: this.sequence1[current.pos[0] - 1] + current.seq1,
                        seq2: "-" + current.seq2
                      });
                    }
                    if (directions[2]) {
                      inProcessAlignments.push({
                        pos: [current.pos[0], current.pos[1] - 1],
                        seq1: "-" + current.seq1,
                        seq2: this.sequence2[current.pos[1] - 1] + current.seq2
                      });
                    }
                    if (current.pos[0] === 0 && current.pos[1] === 0)
                      this.alignments.push({
                        sequence1: current.seq1,
                        sequence2: current.seq2
                      });
                    inProcessAlignments.shift();
                  }
                  return this.alignments;
                }
                // Helper Functions
              }, {
                key: "getAllIndexes",
                value: function getAllIndexes(arr, val) {
                  var indexes = [], i = -1;
                  while ((i = arr.indexOf(val, i + 1)) !== -1) {
                    indexes.push(i);
                  }
                  return indexes;
                }
              }, {
                key: "arrayAllMaxIndexes",
                value: function arrayAllMaxIndexes(array) {
                  return this.getAllIndexes(array, Math.max.apply(null, array));
                }
              }]);
              return NeedlemanWunsch2;
            }();
            module2.exports = NeedlemanWunsch;
          },
          /* 26 */
          /***/
          function(module2, exports2, __webpack_require__) {
            var layoutBase2 = function layoutBase3() {
              return;
            };
            layoutBase2.FDLayout = __webpack_require__(18);
            layoutBase2.FDLayoutConstants = __webpack_require__(7);
            layoutBase2.FDLayoutEdge = __webpack_require__(19);
            layoutBase2.FDLayoutNode = __webpack_require__(20);
            layoutBase2.DimensionD = __webpack_require__(21);
            layoutBase2.HashMap = __webpack_require__(22);
            layoutBase2.HashSet = __webpack_require__(23);
            layoutBase2.IGeometry = __webpack_require__(8);
            layoutBase2.IMath = __webpack_require__(9);
            layoutBase2.Integer = __webpack_require__(10);
            layoutBase2.Point = __webpack_require__(12);
            layoutBase2.PointD = __webpack_require__(4);
            layoutBase2.RandomSeed = __webpack_require__(16);
            layoutBase2.RectangleD = __webpack_require__(13);
            layoutBase2.Transform = __webpack_require__(17);
            layoutBase2.UniqueIDGeneretor = __webpack_require__(14);
            layoutBase2.Quicksort = __webpack_require__(24);
            layoutBase2.LinkedList = __webpack_require__(11);
            layoutBase2.LGraphObject = __webpack_require__(2);
            layoutBase2.LGraph = __webpack_require__(5);
            layoutBase2.LEdge = __webpack_require__(1);
            layoutBase2.LGraphManager = __webpack_require__(6);
            layoutBase2.LNode = __webpack_require__(3);
            layoutBase2.Layout = __webpack_require__(15);
            layoutBase2.LayoutConstants = __webpack_require__(0);
            layoutBase2.NeedlemanWunsch = __webpack_require__(25);
            module2.exports = layoutBase2;
          },
          /* 27 */
          /***/
          function(module2, exports2, __webpack_require__) {
            function Emitter() {
              this.listeners = [];
            }
            var p = Emitter.prototype;
            p.addListener = function(event, callback) {
              this.listeners.push({
                event,
                callback
              });
            };
            p.removeListener = function(event, callback) {
              for (var i = this.listeners.length; i >= 0; i--) {
                var l = this.listeners[i];
                if (l.event === event && l.callback === callback) {
                  this.listeners.splice(i, 1);
                }
              }
            };
            p.emit = function(event, data) {
              for (var i = 0; i < this.listeners.length; i++) {
                var l = this.listeners[i];
                if (event === l.event) {
                  l.callback(data);
                }
              }
            };
            module2.exports = Emitter;
          }
          /******/
        ])
      );
    });
  })(layoutBase);
  return layoutBase.exports;
}
export {
  requireLayoutBase as r
};
