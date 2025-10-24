using UnityEngine;

public class SwingDamage : MonoBehaviour
{
    public float damage;

    public string[] damageableTo;

    void OnTriggerEnter2D(Collider2D collision)
    {
        var enemy = collision.GetComponent<HealthEntity>();
        if (enemy)
        {
            for (int i = 0; i < damageableTo.Length; i++)
            {
                if (enemy.CompareTag(damageableTo[i]))
                {
                    enemy.SubtractHealth(damage);
                }
            }
        }
    }
}
