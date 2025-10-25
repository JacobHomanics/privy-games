using JacobHomanics.Core.SuperchargedVector2;
using UnityEngine;
using UnityEngine.Events;

public class PointsRewarder : MonoBehaviour
{

    public int reward = 200;

    public void Reward()
    {
        FindAnyObjectByType<PointsManager>().points += reward;
    }
}