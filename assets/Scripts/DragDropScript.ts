
import { _decorator, Component, Node, macro, Vec2, RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, EPhysics2DDrawFlags, Label } from 'cc';
//import { MoveScript } from "./MoveScript";

const { ccclass, property } = _decorator;

@ccclass('DragDropScript')
export class DragDropScript extends Component {

    @property({type: Label})
    private scoreLabel: Label | null = null;

    private collider: any;
    //private rigidbody: any;

    start()
    {
        //this.rigidbody = this.node.getComponent(RigidBody2D);
        //PhysicsSystem2D.instance.enable = true;
        //PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None;

        this.collider = this.node.getComponent(BoxCollider2D);
        if (this.collider)
        {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null)
    {
        if (otherCollider.name == "Position<BoxCollider2D>")
        {
            selfCollider.node.setPosition(otherCollider.node.getPosition());

            selfCollider.node;

            this.scoreLabel.string = "onBeginContact";
        }
    }

    onEndContact (selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null)
    {
        if (otherCollider.name == "Position<BoxCollider2D>")
        {
            //otherCollider.node.getComponent("Star").destroyStar();
            
            this.scoreLabel.string = "onEndContact";
        }
    }
}
