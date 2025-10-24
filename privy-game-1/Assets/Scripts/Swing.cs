using UnityEngine;

public class Swing : MonoBehaviour
{
    public Animator anim;

    public float cooldownTimeLeft;
    public float cooldownDuration;

    void Update()
    {
        // cooldownTimeLeft -= Time.deltaTime;

        // if (Input.GetMouseButtonDown(0) && cooldownTimeLeft <= 0)
        // {
        //     anim.Play("Swing");
        //     cooldownTimeLeft = cooldownDuration;
        // }
    }

}
