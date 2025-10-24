using UnityEngine;

public class Staff : MonoBehaviour
{
    [Header("Fireball Settings")]
    public GameObject fireballPrefab;
    public Transform fireballSpawnPoint;

    public string[] damageableTo;

    void Start()
    {
        // If no spawn point is assigned, create one at the staff's position
        if (fireballSpawnPoint == null)
        {
            GameObject spawnPoint = new GameObject("FireballSpawnPoint");
            spawnPoint.transform.SetParent(transform);
            spawnPoint.transform.localPosition = Vector3.right * 1f; // 1 unit to the right of the staff
            fireballSpawnPoint = spawnPoint.transform;
        }
    }

    public void LaunchFireball()
    {
        if (fireballPrefab == null)
        {
            Debug.LogWarning("Fireball prefab is not assigned to Staff!");
            return;
        }

        // Calculate direction based on mouse position (world coordinates)
        Vector3 mouseWorldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        mouseWorldPos.z = 0f; // Ensure z is 0 for 2D

        Vector2 direction = (mouseWorldPos - fireballSpawnPoint.position).normalized;

        // If direction is too small (mouse too close), default to right
        if (direction.magnitude < 0.1f)
        {
            direction = Vector2.right;
        }

        // Instantiate the fireball
        GameObject fireball = Instantiate(fireballPrefab, fireballSpawnPoint.position, Quaternion.identity);

        // Configure the fireball
        Fireball fireballScript = fireball.GetComponent<Fireball>();
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
        if (fireballSpawnPoint != null)
        {
            Gizmos.color = Color.red;
            Gizmos.DrawWireSphere(fireballSpawnPoint.position, 0.2f);

            // Draw direction indicator
            Gizmos.color = Color.yellow;
            Gizmos.DrawRay(fireballSpawnPoint.position, Vector2.right * 2f);
        }
    }
}
