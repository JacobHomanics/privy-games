using UnityEngine;

public class Bow : MonoBehaviour
{
    [Header("Animation")]
    public Animator anim;

    [Header("Cooldown Settings")]
    public float cooldownTimeLeft;
    public float cooldownDuration = 1f;

    [Header("Fireball Settings")]
    public GameObject arrowPrefab;
    public Transform spawnPoint;

    void Update()
    {
        cooldownTimeLeft -= Time.deltaTime;

        if (Input.GetMouseButtonDown(0) && cooldownTimeLeft <= 0)
        {
            CastFireball();
            cooldownTimeLeft = cooldownDuration;
        }
    }

    void CastFireball()
    {
        LaunchFireball();
    }

    void LaunchFireball()
    {
        if (arrowPrefab == null)
        {
            Debug.LogWarning("Fireball prefab is not assigned to Staff!");
            return;
        }

        // Calculate direction based on mouse position (world coordinates)
        Vector3 mouseWorldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        mouseWorldPos.z = 0f; // Ensure z is 0 for 2D

        Vector2 direction = (mouseWorldPos - spawnPoint.position).normalized;

        // If direction is too small (mouse too close), default to right
        if (direction.magnitude < 0.1f)
        {
            direction = Vector2.right;
        }

        // Instantiate the fireball
        GameObject fireball = Instantiate(arrowPrefab, spawnPoint.position, Quaternion.identity);

        // Configure the fireball
        Arrow fireballScript = fireball.GetComponent<Arrow>();
        if (fireballScript != null)
        {
            fireballScript.direction = direction;
            // fireballScript.speed = fireballSpeed;
            // fireballScript.damage = fireballDamage;
        }
        else
        {
            Debug.LogError("Fireball prefab doesn't have a Fireball script component!");
        }
    }

    void OnDrawGizmosSelected()
    {
        // Draw the spawn point in the editor
        if (spawnPoint != null)
        {
            Gizmos.color = Color.red;
            Gizmos.DrawWireSphere(spawnPoint.position, 0.2f);

            // Draw direction indicator
            Gizmos.color = Color.yellow;
            Gizmos.DrawRay(spawnPoint.position, Vector2.right * 2f);
        }
    }
}
