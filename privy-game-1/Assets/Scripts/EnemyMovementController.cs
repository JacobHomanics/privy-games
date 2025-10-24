using UnityEngine;

public class EnemyMovementController : MonoBehaviour
{
    public Rigidbody2D rb;
    public float speed = 0.1f;

    public Transform t;

    void Start()
    {
        GameObject.FindGameObjectWithTag("Player");
    }

    void Update()
    {
        // Set the velocity based on direction and speed
        rb.linearVelocity = t.right.normalized * speed;

    }

}
