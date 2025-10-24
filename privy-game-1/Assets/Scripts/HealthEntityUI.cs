using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

[RequireComponent(typeof(Slider))]
public class HealthEntityUI : MonoBehaviour
{
    public HealthEntity healthEntity;

    void Start()
    {

        GetComponent<Slider>().maxValue = healthEntity.maxHealth;
    }

    void Update()
    {
        GetComponent<Slider>().value = healthEntity.getHealth();
    }

}
