from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend later if needed

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "AI Matching Backend is running!"})

@app.route("/match", methods=["POST"])
def match_profile():
    try:
        data = request.get_json()

        # Extract student and internship data
        student = data.get("student", {})
        internship = data.get("internship", {})

        # --- Matching Logic ---
        student_skills = set(student.get("skills", []))
        internship_skills = set(internship.get("requiredSkills", []))

        # Skill match percentage
        skill_match = (len(student_skills.intersection(internship_skills)) / max(len(internship_skills), 1)) * 100

        # CGPA check
        cgpa_score = 100 if student.get("cgpa", 0) >= internship.get("minCgpa", 0) else 0

        # Final score (70% skills, 30% CGPA)
        match_score = int(0.7 * skill_match + 0.3 * cgpa_score)
        recommended = match_score >= 70

        return jsonify({
            "match_score": match_score,
            "recommended": recommended,
            "reason": f"Skill match: {skill_match:.0f}%, CGPA check: {'Pass' if cgpa_score == 100 else 'Fail'}"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(port=5000, debug=True)
