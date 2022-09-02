<!DOCTYPE html>

<!--
 // WEBSITE: https://themefisher.com
 // TWITTER: https://twitter.com/themefisher
 // FACEBOOK: https://www.facebook.com/themefisher
 // GITHUB: https://github.com/themefisher/
-->

<html lang="en">
<head>

  <!-- ** Basic Page Needs ** -->
  <meta charset="utf-8">
  <title>CV Parser</title>

  <!-- ** Mobile Specific Metas ** -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="Agency HTML Template">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta name="author" content="Themefisher">
  <meta name="generator" content="Themefisher Classified Marketplace Template v1.0">

  <!-- favicon -->
  <link href="images/favicon.png" rel="shortcut icon">

  <!-- 
  Essential stylesheets
  =====================================-->
  <link href="plugins/bootstrap/bootstrap.min.css" rel="stylesheet">
  <link href="plugins/bootstrap/bootstrap-slider.css" rel="stylesheet">
  <link href="plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="plugins/slick/slick.css" rel="stylesheet">
  <link href="plugins/slick/slick-theme.css" rel="stylesheet">
  <link href="plugins/jquery-nice-select/css/nice-select.css" rel="stylesheet">

  <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.min.css">
  
  <link href="css/style.css" rel="stylesheet">

</head>

<body class="body-wrapper">

<!--===============================
=            Hero Area            =
================================-->

<section class="hero-area bg-1 text-center overly">
	<!-- Container Start -->
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<!-- Header Contetnt -->
				<div class="short-popular-category-list content-block">
					<h1>Parse one or multiple PDFs</h1>
					<ol class="list-inline">
                        <li class="list-inline-item">Slect one or multiple CVs</li>
                        <li class="list-inline-item">Input the terms you are looking for</li>
                        <li class="list-inline-item">Parse the file(s)</li>
                        <li class="list-inline-item">Review your results and download the list as an excel</li>
                    </ol>

				</div>
				<!-- Advance Search -->
				<div class="advance-search">
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-12 col-md-12 align-content-center">
								<form id="parse-form">
									<div class="form-row">
										<div class="form-group col-xl-2 col-lg-3 col-md-3 ">
											<input type="file" class="form-control my-2 my-lg-1"
												placeholder="" id="files" required ACCEPT=".pdf" multiple="multiple">
										</div>
										<div class="form-group col-xl-8 col-lg-6 col-md-9">
											<input type="text" class="form-control my-2 my-lg-1" placeholder="Keywords; seperated; by; semicolon" id = "keywords" required>
										</div>
										<div class="form-group col-xl-2 col-lg-3 col-md-6 align-self-center">
											<button type="submit" class="btn btn-primary active w-100" id="parse-button">Parse</button>
										</div>
									</div>
								</form>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Container End -->
</section>



<!--===========================================
=            Popular deals section            =
============================================-->

<section class="popular-deals section bg-gray">
	<div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12 align-content-center">
                <table data-toggle="table" class="table" data-pagination="true" id="table">
                    <thead>
                    <tr>
                        <th data-field="page">page</th>
                        <th data-field="word">word</th>
                        <th data-field="count_count">count</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</section>

<!--LOADING-->
<div class="loader-container section" id ="loader_cont">
  <div class="container">
    <div class="row justify-content-center">
      <div class="align-content-center">
  <div class="spinner "></div>
</div>
</div></div>
</div>


<!--============================
=            Footer            =
=============================-->

<footer class="footer section section-sm">
  <!-- Container Start -->
  <div class="container">
    
</footer>
<!-- Footer Bottom -->
<footer class="footer-bottom">
  <!-- Container Start -->
  <div class="container">
    <div class="row">
      <div class="col-lg-6 text-center text-lg-left mb-3 mb-lg-0">
        <!-- Copyright -->
        <div class="copyright">
          <p>In case of questions or problems, please contact me</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Container End -->
  <!-- To Top -->
  <div class="scroll-top-to">
    <i class="fa fa-angle-up"></i>
  </div>
</footer>

<!-- 
Essential Scripts
=====================================-->
<script src="plugins/jquery/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.min.js"></script>

<script src="https://npmcdn.com/pdfjs-dist/build/pdf.js"></script>
<script src="https://cdn.jsdelivr.net/npm/danfojs@1.1.0/lib/bundle.min.js"></script>

<script src="plugins/bootstrap/popper.min.js"></script>
<script src="plugins/bootstrap/bootstrap-slider.js"></script>
<!---
<script src="plugins/bootstrap/bootstrap.min.js"></script>
<script src="https://unpkg.com/bootstrap-table@1.21.0/dist/bootstrap-table.min.js"></script>
-->
<script src="plugins/tether/js/tether.min.js"></script>
<script src="plugins/raty/jquery.raty-fa.js"></script>
<script src="plugins/slick/slick.min.js"></script>
<script src="plugins/jquery-nice-select/js/jquery.nice-select.min.js"></script>


<script src="js/script.js"></script>
<script src="function.js"></script>

</body>

</html>



