using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class HealthEntity : MonoBehaviour
{
    public float maxHealth;

    [SerializeField] private float health;

    public float getHealth()
    {
        return health;
    }

    public UnityEvent onZero;

    private void ModifyHealth(float newHealth)
    {
        health = newHealth;
        if (health <= 0)
        {
            onZero.Invoke();
        }
    }

    public void AddHealth(float amount)
    {
        ModifyHealth(health + amount);
    }

    public void SubtractHealth(float amount)
    {
        ModifyHealth(health - amount);
    }
}
