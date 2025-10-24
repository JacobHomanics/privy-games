using UnityEngine;

public class GameObjectDestroyer : MonoBehaviour
{
    public void Destroy(GameObject go)
    {
        // go.SetActive(false);
        GameObject.Destroy(go);
    }
}
