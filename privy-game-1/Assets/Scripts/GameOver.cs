using UnityEngine;
using UnityEngine.SceneManagement;

public class GameOver : MonoBehaviour
{
    public PointsManager pm;

    public void OnOver()
    {
        var highscore = PlayerPrefs.GetInt("Points");

        if (pm.points > highscore)
            PlayerPrefs.SetInt("Points", pm.points);


        SceneManager.LoadScene("GameOverScene");
    }
}
