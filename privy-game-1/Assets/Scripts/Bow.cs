using UnityEngine;

public class Bow : MonoBehaviour
{
    [Header("Fireball Settings")]
    public GameObject arrowPrefab;
    public Transform spawnPoint;

    public string[] damageableTo;

    public void Shoot()
    {
        if (arrowPrefab == null)
        {
            Debug.LogWarning("Fireball prefab is not assigned to Staff!");
            return;
        }

        // Calculate direction based on mouse position (world coordinates)
        // Get the forward direction of the GameObject (in 2D, often its "up" axis)
        Vector2 forwardDirection = transform.right;

        // Calculate the direction from the spawn point
        Vector2 direction = forwardDirection.normalized;

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
            fireballScript.damageableTo = damageableTo;
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
