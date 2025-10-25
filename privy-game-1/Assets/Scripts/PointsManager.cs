using TMPro;
using UnityEngine;

public class PointsManager : MonoBehaviour
{
    public int points;

    public TMP_Text pointsText;

    public bool loadFromHighscore;

    void Start()
    {
        if (loadFromHighscore)
            points = PlayerPrefs.GetInt("Points");
    }

    void Update()
    {
        pointsText.text = points.ToString();
    }
}
