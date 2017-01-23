import java.awt.Component;
import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class EyeTracker extends JFrame {
	public static List<Mot> ListeMot = new LinkedList(); 
	
	public EyeTracker() {
		super();
		CreateJFrame();
	}
		
	public void PositionMot(Container parent) {
		Component[] all = parent.getComponents();
		System.out.println("Position des mots");
		for (Component c : all) {
			ListeMot.add(new Mot(c.getX(), c.getY(), ((JLabel)c).getText()));
			System.out.println(((JLabel)c).getText());
			System.out.println("X: " + c.getX() + " Y: " + c.getY());
		}
	}
		
	private void CliqueSouris(JPanel panel) {
		panel.addMouseListener(new MouseAdapter() {
			public void mousePressed(MouseEvent e) {
				System.out.println(e.getX() + "," + e.getY());
			}
		});
	}
		
	private JPanel RecuperationTexte(){
		FileInputStream contenuFichier = null;
		String texte = "";
		final JPanel p = new JPanel(new FlowLayout());
		try {
			contenuFichier = new FileInputStream(new File("Test.txt"));
			byte[] buffer = new byte[8];
			int n = 0;
			while((n = contenuFichier.read(buffer)) >= 0) {
				for(byte bit : buffer) {
					if((((char)bit != ' ')) && ((char)bit != '\n')){
						texte += (char)bit;
					}
					else {
						System.out.println(texte);
						p.add(new JLabel(texte));
						texte = "";
					}
				}
				buffer = new byte[8];
			}
			p.add(new JLabel(texte));
			System.out.println("Copie terminée !");
		} catch(FileNotFoundException e) {
			e.printStackTrace();
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if(contenuFichier != null) 
					contenuFichier.close();
			} catch(IOException e) {
				e.printStackTrace();
			}
		}
		ComponentListener cl = new ComponentAdapter() {
			@Override
			public void componentResized(ComponentEvent ce) {
				PositionMot(p);
			}
		};
		p.addComponentListener(cl);
		CliqueSouris(p);
		return p;
	}	
		
	private void CreateJFrame() {
		setTitle("Affichage du texte");
		setSize(320,240); 
		setLocationRelativeTo(null); 
		setResizable(true);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); 
		setContentPane(RecuperationTexte());
	}
		
	public static void main(String[]args) {
		EyeTracker fenêtre = new EyeTracker();
		fenêtre.setVisible(true);
		
		for(int i = 0; i < ListeMot.size(); i++) {
			System.out.println(ListeMot.get(i).getX());
			System.out.println(ListeMot.get(i).getY());
			System.out.println(ListeMot.get(i).getMot());
		}
	}
}