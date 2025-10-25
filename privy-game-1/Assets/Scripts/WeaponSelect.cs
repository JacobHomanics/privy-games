using UnityEngine;
using UnityEngine.SceneManagement;

public class WeaponSelect : MonoBehaviour
{
    public void Set(string weapon)
    {
        PlayerPrefs.SetString("Weapon", weapon);
        SceneManager.LoadScene("SampleScene");
    }
}
