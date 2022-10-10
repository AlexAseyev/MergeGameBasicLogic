
import { _decorator, Component, Node, CCObject, Touch, macro, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, EPhysics2DDrawFlags, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectScript')
export class ObjectScript extends Component {

    private collider: any;

    _sprite: Node;
    _position: Vec2;
    _canvas: Node;
    _moving: boolean;
    _x: number;
    _y: number;

    onLoad()
    {
        this._sprite = this.node;
        this._position = new Vec2();
        this._canvas = this.node.parent;

        this._sprite.on(Node.EventType.TOUCH_START,  this.onTouchStart, this);
        this._canvas.on(Node.EventType.TOUCH_END,    this.onTouchEnd, this);
        this._canvas.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this._canvas.on(Node.EventType.TOUCH_MOVE,   this.onTouchMove, this);
    }

    onDestroy()
    {
        this._sprite.off(Node.EventType.TOUCH_START,  this.onTouchStart, this);
        this._canvas.off(Node.EventType.TOUCH_END,    this.onTouchEnd, this);
        this._canvas.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this._canvas.off(Node.EventType.TOUCH_MOVE,   this.onTouchMove, this);
    }

    onTouchStart(e: Touch)
    {
        this._moving = true;
        this._x = this._sprite.getPosition().x;
        this._y = this._sprite.getPosition().y;

        this.onSpriteDecrease();
    }

    onTouchEnd(e: Touch)
    {
        this._moving = false;

        this.onSpriteStartState();

        this._sprite.setPosition(this._position.x, this._position.y, 0);
    }

    onTouchCancel(e: Touch)
    {
        this._moving = false;

        this.onSpriteStartState();
    }

    onTouchMove(e: Touch)
    {
        if (this._moving)
        {
            let delta = e.getUIDelta();
            this._x += delta.x;
            this._y += delta.y;
        }
    }

    onSpriteDecrease()
    {
        this._sprite.setScale(0.19, 0.19, 0.19);
    }

    onSpriteStartState()
    {
        this._sprite.setScale(0.2, 0.2, 0.2);
    }

    update(dt)
    {
        if (this._moving)
        {
            this._sprite.setPosition(this._x, this._y, 0);
        }
    }


    start()
    {
        this.collider = this.node.getComponent(BoxCollider2D);
        if (this.collider)
        {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null)
    {
        if (otherCollider.name == "Position<BoxCollider2D>")
        {
            this._position.x = otherCollider.node.getPosition().x;
            this._position.y = otherCollider.node.getPosition().y;
        }
    }
}
