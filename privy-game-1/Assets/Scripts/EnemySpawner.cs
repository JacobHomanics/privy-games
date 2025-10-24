using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    public GameObject prefab;

    public Transform originPoint;

    // In your Spawner script
    public float innerRadius;
    public float outerRadius;

    public float minSpawnTime;
    public float maxSpawnTime;

    public float spawnTimeLeft;


    void Update()
    {
        spawnTimeLeft -= Time.deltaTime;

        if (spawnTimeLeft <= 0)
        {
            SpawnObject();
            spawnTimeLeft = Random.Range(minSpawnTime, maxSpawnTime);
        }
    }

    [ContextMenu("Spawn Object")]
    public void SpawnObject()
    {
        // 1. Calculate a random distance between the two radii
        float randomDistance = Random.Range(innerRadius, outerRadius);

        // 2. Get a random direction on a unit circle
        Vector2 randomDirection = Random.insideUnitCircle.normalized;

        // 3. Calculate the final position
        Vector2 spawnPosition = (Vector2)originPoint.position + randomDirection * randomDistance;

        // 4. Instantiate the object
        Instantiate(prefab, spawnPosition, Quaternion.identity);
    }

#if UNITY_EDITOR
    void OnDrawGizmos()
    {
        // Draw inner radius
        Gizmos.color = Color.green;
        Gizmos.DrawWireSphere(new Vector3(originPoint.position.x, originPoint.position.y, 0f), innerRadius);

        // Draw outer radius
        Gizmos.color = Color.blue;
        Gizmos.DrawWireSphere(new Vector3(originPoint.position.x, originPoint.position.y, 0f), outerRadius);

        // Draw center point
        Gizmos.color = Color.red;
        Gizmos.DrawSphere(new Vector3(originPoint.position.x, originPoint.position.y, 0f), 0.01f);
    }
#endif
}
