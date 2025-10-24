using UnityEngine;

public class WeaponRandomizer : MonoBehaviour
{
    public GameObject[] gos;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        Randomize();
    }

    public void Randomize()
    {
        var rn = Random.Range(0, gos.Length);
        gos[rn].SetActive(true);
    }
}
