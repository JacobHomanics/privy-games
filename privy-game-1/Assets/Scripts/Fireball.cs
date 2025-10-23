using UnityEngine;

// Fireball projectile script for Staff weapon
public class Fireball : MonoBehaviour
{
    [Header("Fireball Settings")]
    public float speed = 10f;
    public float damage = 25f;
    public float lifetime = 5f;
    public Vector2 direction = Vector2.right;

    private Rigidbody2D rb;

    public string[] damageableTo;


    void Start()
    {
        rb = GetComponent<Rigidbody2D>();

        // Set up the fireball
        SetupFireball();

        // Destroy after lifetime
        Destroy(gameObject, lifetime);
    }

    void SetupFireball()
    {
        // Set the velocity based on direction and speed
        rb.linearVelocity = direction.normalized * speed;

        // Rotate the fireball to face the direction it's moving
        float angle = Mathf.Atan2(direction.y, direction.x) * Mathf.Rad2Deg;
        transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);
    }

    void OnTriggerEnter2D(Collider2D collision)
    {
        // Check if we hit an enemy
        var enemy = collision.GetComponent<HealthEntity>();
        if (enemy != null)
        {
            for (int i = 0; i < damageableTo.Length; i++)
            {
                if (enemy.CompareTag(damageableTo[i]))
                {
                    enemy.Health -= damage;

                    Destroy(gameObject);
                    return;
                }
            }

        }

    }
}
