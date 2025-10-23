using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class HealthEntity : MonoBehaviour
{
    public float maxHealth;

    private float health;

    public UnityEvent onZero;

    public float Health
    {
        get
        {
            return health;
        }
        set
        {
            health = value;
            if (health <= 0)
            {
                Destroy(gameObject);
                onZero.Invoke();
            }
        }
    }

    public Slider slider;

    void Start()
    {
        Health = maxHealth;
    }

    void Update()
    {
        slider.value = health;
        slider.maxValue = maxHealth;
    }
}
