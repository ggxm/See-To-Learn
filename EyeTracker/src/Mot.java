public class Mot {
	private int x;
	private int y;
	private String mot;
	
	public Mot(int x, int y, String mot){
		this.x = x;
		this.y = y;
		this.mot = mot;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public String getMot() {
		return mot;
	}

	public void setMot(String mot) {
		this.mot = mot;
	}
}