using UnityEngine;

public class WeaponInitializer : MonoBehaviour
{
    public GameObject sword;
    public GameObject staff;
    public GameObject bow;

    void Start()
    {
        var weapon = PlayerPrefs.GetString("Weapon");
        if (weapon == "Bow")
        {
            bow.SetActive(true);
        }

        if (weapon == "Staff")
        {
            staff.SetActive(true);
        }

        if (weapon == "Sword")
        {
            sword.SetActive(true);
        }
    }
}
